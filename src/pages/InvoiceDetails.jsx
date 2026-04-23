import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { InvoiceContext } from "../context/InvoiceContext";

function InvoiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { invoices, deleteInvoice } = useContext(InvoiceContext);

  const [showModal, setShowModal] = useState(false);

  const invoice = invoices.find((inv) => inv.id === id);

  if (!invoice) return <p>Invoice not found</p>;

  return (
    <div style={{ padding: "20px" }}>
      {/* Back */}
      <button onClick={() => navigate("/")} style={{ marginBottom: "20px" }}>
        ← Go Back
      </button>

      {/* Status + Actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#fff",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <p>
          Status:{" "}
          <strong style={{ textTransform: "capitalize" }}>
            {invoice.status}
          </strong>
        </p>

        <div style={{ display: "flex", gap: "10px" }}>
          <button>Edit</button>

          {/* 🔥 OPEN MODAL INSTEAD OF DIRECT DELETE */}
          <button onClick={() => setShowModal(true)}>Delete</button>

          <button>Mark as Paid</button>
        </div>
      </div>

      {/* Invoice Info */}
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h3>
          <span style={{ color: "#888EB0" }}>#</span>
          {invoice.id}
        </h3>

        <p><strong>Client:</strong> {invoice.clientName}</p>
        <p><strong>Due Date:</strong> {invoice.paymentDue}</p>
        <p><strong>Total:</strong> ₦{invoice.total}</p>
      </div>

      {/* 🔥 MODAL */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "320px",
            }}
          >
            <h3>Confirm Deletion</h3>
            <p>
              Are you sure you want to delete invoice{" "}
              <strong>#{invoice.id}</strong>? This action cannot be undone.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              <button onClick={() => setShowModal(false)}>Cancel</button>

              <button
                onClick={() => {
                  deleteInvoice(invoice.id);
                  navigate("/");
                }}
                style={{
                  background: "red",
                  color: "#fff",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "4px",
                }}
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