import { useParams, useNavigate } from "react-router-dom";
import { invoices } from "../utils/data";

function InvoiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

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
          Status: <strong>{invoice.status}</strong>
        </p>

        <div style={{ display: "flex", gap: "10px" }}>
          <button>Edit</button>
          <button>Delete</button>
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
        <h3>#{invoice.id}</h3>

        <p><strong>Client:</strong> {invoice.clientName}</p>
        <p><strong>Due Date:</strong> {invoice.paymentDue}</p>
        <p><strong>Total:</strong> ₦{invoice.total}</p>
      </div>
    </div>
  );
}

export default InvoiceDetail;