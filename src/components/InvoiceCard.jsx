import { useNavigate } from "react-router-dom";

function InvoiceCard({ invoice }) {
  const navigate = useNavigate();

  const getStatusStyle = () => {
    switch (invoice.status) {
      case "paid":
        return { color: "#33D69F", background: "#33d69f20" };
      case "pending":
        return { color: "#FF8F00", background: "#ff8f0020" };
      case "draft":
        return { color: "#888EB0", background: "#888eb020" };
      default:
        return {};
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB");
  };

  return (
    <div
      onClick={() => navigate(`/invoice/${invoice.id}`)}
      onMouseEnter={(e) =>
        (e.currentTarget.style.border = "1px solid #7C5DFA")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.border = "1px solid transparent")
      }
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 24px",
        borderRadius: "10px",
        background: "#ffffff",
        marginTop: "12px",
        cursor: "pointer",
        transition: "0.2s",
        border: "1px solid transparent",
      }}
    >
      {/* LEFT SIDE */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <p style={{ fontWeight: "bold" }}>
          <span style={{ color: "#888EB0" }}>#</span>
          {invoice.id}
        </p>

        <p style={{ color: "#888EB0" }}>
          Due {formatDate(invoice.paymentDue)}
        </p>

        <p>{invoice.clientName}</p>
      </div>

      {/* RIGHT SIDE */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <p style={{ fontWeight: "bold" }}>₦{invoice.total}</p>

        <span
          style={{
            padding: "6px 12px",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: "bold",
            textTransform: "capitalize",
            ...getStatusStyle(),
          }}
        >
          {invoice.status}
        </span>

        {/* Arrow */}
        <span style={{ color: "#7C5DFA", fontSize: "18px" }}>›</span>
      </div>
    </div>
  );
}

export default InvoiceCard;