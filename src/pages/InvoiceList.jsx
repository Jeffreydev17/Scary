import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InvoiceContext } from "../context/InvoiceContext";
import InvoiceCard from "../components/InvoiceCard";

function InvoiceList() {
  const { invoices } = useContext(InvoiceContext);
  const navigate = useNavigate(); // ✅ ADD THIS

  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Handle checkbox toggle
  const handleFilterChange = (status) => {
    if (selectedFilters.includes(status)) {
      setSelectedFilters(selectedFilters.filter((s) => s !== status));
    } else {
      setSelectedFilters([...selectedFilters, status]);
    }
  };

  // Filter logic
  const filteredInvoices =
    selectedFilters.length === 0
      ? invoices
      : invoices.filter((inv) => selectedFilters.includes(inv.status));

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Invoices</h2>
          <p className="text-gray-500">
            There are {filteredInvoices.length} total invoices
          </p>
        </div>

        {/* Filter + New */}
        <div className="flex items-center gap-4">
          {/* FILTER */}
          <div className="relative">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-2 font-semibold text-gray-700 hover:text-purple-600 transition"
            >
              Filter by status
              <svg
                className={`w-4 h-4 transition-transform ${
                  showFilter ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showFilter && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-4 w-40 z-10 border">
                {["draft", "pending", "paid"].map((status) => (
                  <label
                    key={status}
                    className="flex items-center gap-2 mb-3 last:mb-0 cursor-pointer hover:text-purple-600"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes(status)}
                      onChange={() => handleFilterChange(status)}
                      className="w-4 h-4 text-purple-600"
                    />
                    <span className="capitalize text-sm">{status}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* ✅ NEW BUTTON NOW WORKS */}
          <button
            onClick={() => navigate("/new")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full flex items-center gap-2 transition shadow"
          >
            <span className="bg-white text-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-lg font-bold">
              +
            </span>
            New
          </button>
        </div>
      </div>

      {/* LIST */}
      <div className="mt-6 flex flex-col gap-4">
        {filteredInvoices.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No invoices found</p>
          </div>
        ) : (
          filteredInvoices.map((inv) => (
            <InvoiceCard key={inv.id} invoice={inv} />
          ))
        )}
      </div>
    </div>
  );
}

export default InvoiceList;