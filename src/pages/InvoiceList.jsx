import { invoices } from "../utils/data";
import InvoiceCard from "../components/InvoiceCard";

function InvoiceList() {
  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h2>Invoices</h2>
          <p>There are {invoices.length} total invoices</p>
        </div>

        <button>+ New</button>
      </div>

      {invoices.map((inv) => (
        <InvoiceCard key={inv.id} invoice={inv} />
      ))}
    </div>
  );
}

export default InvoiceList;