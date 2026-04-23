import { createContext, useState } from "react";
import { invoices as initialData } from "../utils/data";

export const InvoiceContext = createContext();

function InvoiceProvider({ children }) {
  const [invoices, setInvoices] = useState(initialData);

  // 🗑 DELETE FUNCTION
  const deleteInvoice = (id) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
  };

  // ✅ MARK AS PAID FUNCTION
  const markAsPaid = (id) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === id ? { ...inv, status: "paid" } : inv
      )
    );
  };

  // ✏️ UPDATE (EDIT) FUNCTION
  const updateInvoice = (id, updatedData) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === id ? { ...inv, ...updatedData } : inv
      )
    );
  };

  return (
    <InvoiceContext.Provider
      value={{
        invoices,
        deleteInvoice,
        markAsPaid,
        updateInvoice, // 🔥 IMPORTANT
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}

export default InvoiceProvider;