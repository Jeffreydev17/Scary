import { createContext, useState } from "react";
import { invoices as initialData } from "../utils/data";

export const InvoiceContext = createContext();

function InvoiceProvider({ children }) {
  const [invoices, setInvoices] = useState(initialData);

  // DELETE FUNCTION
  const deleteInvoice = (id) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
  };

  return (
    <InvoiceContext.Provider value={{ invoices, deleteInvoice }}>
      {children}
    </InvoiceContext.Provider>
  );
}

export default InvoiceProvider;