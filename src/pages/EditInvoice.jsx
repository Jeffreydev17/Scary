import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { InvoiceContext } from "../context/InvoiceContext";

function EditInvoice() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ include updateInvoice
  const { invoices, updateInvoice } = useContext(InvoiceContext);

  const invoice = invoices.find((inv) => inv.id === id);

  const [formData, setFormData] = useState(null);

  // ✅ ensure form loads safely
  useEffect(() => {
    if (invoice) {
      setFormData(invoice);
    }
  }, [invoice]);

  if (!invoice || !formData) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Edit Invoice</h2>

      <form className="flex flex-col gap-4">
        <input
          className="border p-2"
          value={formData.clientName}
          onChange={(e) =>
            setFormData({ ...formData, clientName: e.target.value })
          }
          placeholder="Client Name"
        />

        <input
          className="border p-2"
          value={formData.paymentDue}
          onChange={(e) =>
            setFormData({ ...formData, paymentDue: e.target.value })
          }
          placeholder="Due Date"
        />

        <input
          className="border p-2"
          value={formData.total}
          onChange={(e) =>
            setFormData({ ...formData, total: e.target.value })
          }
          placeholder="Total"
        />

        {/* ✅ SAVE BUTTON NOW WORKS */}
        <button
          type="button"
          className="bg-purple-600 text-white p-2 rounded"
          onClick={() => {
            updateInvoice(id, formData);
            navigate("/");
          }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditInvoice;