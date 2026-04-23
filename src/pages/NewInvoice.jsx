import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { InvoiceContext } from "../context/InvoiceContext";

function NewInvoice() {
  const navigate = useNavigate();
  const { addInvoice } = useContext(InvoiceContext);

  const [formData, setFormData] = useState({
    clientName: "",
    paymentDue: "",
    total: "",
  });

  const handleSubmit = (status) => {
    if (!formData.clientName || !formData.paymentDue || !formData.total) {
      alert("All fields required");
      return;
    }

    const newInvoice = {
      ...formData,
      id: Math.random().toString(36).substring(2, 7).toUpperCase(),
      status,
    };

    addInvoice(newInvoice);
    navigate("/");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">New Invoice</h2>

      <div className="flex flex-col gap-4">
        <input
          className="border p-2"
          placeholder="Client Name"
          onChange={(e) =>
            setFormData({ ...formData, clientName: e.target.value })
          }
        />

        <input
          className="border p-2"
          placeholder="Due Date"
          onChange={(e) =>
            setFormData({ ...formData, paymentDue: e.target.value })
          }
        />

        <input
          className="border p-2"
          placeholder="Total"
          onChange={(e) =>
            setFormData({ ...formData, total: e.target.value })
          }
        />

        {/* ACTION BUTTONS */}
        <div className="flex gap-3">
          <button
            onClick={() => handleSubmit("draft")}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Save as Draft
          </button>

          <button
            onClick={() => handleSubmit("pending")}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Save & Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewInvoice;