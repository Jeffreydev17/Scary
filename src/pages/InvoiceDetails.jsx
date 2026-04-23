import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { InvoiceContext } from "../context/InvoiceContext";

function InvoiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { invoices, deleteInvoice, markAsPaid } = useContext(InvoiceContext);
  const [showModal, setShowModal] = useState(false);

  const invoice = invoices.find((inv) => inv.id === id);

  if (!invoice) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500 text-lg">Invoice not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 md:py-10">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 font-medium mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Go Back
      </button>

      {/* Status + Actions Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="text-gray-500 text-sm">Status:</span>
          <span
            className={`
              inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize
              ${invoice.status === "paid" 
                ? "bg-green-100 text-green-700" 
                : "bg-orange-100 text-orange-700"}
            `}
          >
            <span className={`w-2 h-2 rounded-full mr-2 ${invoice.status === "paid" ? "bg-green-500" : "bg-orange-500"}`}></span>
            {invoice.status}
          </span>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={() => {/* navigate to edit */}}
            className="flex-1 sm:flex-none px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex-1 sm:flex-none px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-medium transition-colors"
          >
            Delete
          </button>
          <button
            onClick={() => markAsPaid(invoice.id)}
            disabled={invoice.status === "paid"}
            className={`
              flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-medium transition-colors
              ${invoice.status === "paid"
                ? "bg-green-50 text-green-600 cursor-default"
                : "bg-purple-600 hover:bg-purple-700 text-white shadow-sm"}
            `}
          >
            {invoice.status === "paid" ? "Paid ✓" : "Mark as Paid"}
          </button>
        </div>
      </div>

      {/* Invoice Details Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header with Invoice # */}
        <div className="border-b border-gray-100 px-6 py-5">
          <h2 className="text-2xl font-bold text-gray-900">
            <span className="text-gray-400 font-medium">#</span>
            {invoice.id}
          </h2>
        </div>

        {/* Invoice Info Grid */}
        <div className="p-6 space-y-5">
          {/* Client & Dates Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-1">Client</p>
                <p className="text-gray-900 font-medium">{invoice.clientName}</p>
                {invoice.company && (
                  <p className="text-sm text-gray-500 mt-0.5">{invoice.company}</p>
                )}
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-1">Issue Date</p>
                <p className="text-gray-800">{invoice.issueDate || invoice.createdAt || "—"}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-1">Payment Due</p>
                <p className="text-gray-800 font-medium">{invoice.paymentDue}</p>
              </div>
              {invoice.createdAt && (
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-1">Created</p>
                  <p className="text-gray-800">{invoice.createdAt}</p>
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 my-2"></div>

          {/* Amount Summary */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
            <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-3xl font-bold text-gray-900">
                {invoice.currency || "₦"}{invoice.total?.toLocaleString()}
              </p>
            </div>
            {invoice.amountDue && invoice.amountDue !== invoice.total && (
              <div className="text-right">
                <p className="text-sm text-gray-500">Amount Due</p>
                <p className="text-xl font-semibold text-purple-600">
                  {invoice.currency || "₦"}{invoice.amountDue?.toLocaleString()}
                </p>
              </div>
            )}
          </div>

          {/* Additional Details (if any, like from the original invoice) */}
          {(invoice.subtotal || invoice.discount) && (
            <div className="bg-gray-50 rounded-xl p-4 mt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-gray-700">{invoice.currency || "₦"}{invoice.subtotal?.toLocaleString()}</span>
              </div>
              {invoice.discount && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Discount / Adjustment</span>
                  <span className="text-red-500">-{invoice.currency || "₦"}{invoice.discount?.toLocaleString()}</span>
                </div>
              )}
              <div className="border-t border-gray-200 my-2"></div>
              <div className="flex justify-between font-semibold">
                <span>Net Total</span>
                <span>{invoice.currency || "₦"}{invoice.total?.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Confirm Deletion</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete invoice <strong className="text-gray-900">#{invoice.id}</strong>? 
                This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    deleteInvoice(invoice.id);
                    navigate("/");
                  }}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors shadow-sm"
                >
                  Delete Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Optional animation styles for modal */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}

export default InvoiceDetail;