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
          {/* ✅ FIXED EDIT BUTTON */}
          <button
            onClick={() => navigate(`/edit/${invoice.id}`)}
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
        <div className="border-b border-gray-100 px-6 py-5">
          <h2 className="text-2xl font-bold text-gray-900">
            <span className="text-gray-400 font-medium">#</span>
            {invoice.id}
          </h2>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <p className="text-xs uppercase text-gray-400 font-semibold mb-1">Client</p>
                <p className="text-gray-900 font-medium">{invoice.clientName}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs uppercase text-gray-400 font-semibold mb-1">Payment Due</p>
                <p className="text-gray-800 font-medium">{invoice.paymentDue}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 my-2"></div>

          <div className="flex justify-between items-center pt-2">
            <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-3xl font-bold text-gray-900">
                ₦{invoice.total?.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-xl p-6 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-2">Confirm Deletion</h3>
            <p className="text-gray-600 mb-4">
              Delete invoice #{invoice.id}?
            </p>

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button
                onClick={() => {
                  deleteInvoice(invoice.id);
                  navigate("/");
                }}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InvoiceDetail;