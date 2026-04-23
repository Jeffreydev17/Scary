// App.jsx
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InvoiceList from "./pages/InvoiceList.jsx";
import InvoiceDetail from "./pages/InvoiceDetails.jsx";
import EditInvoice from "./pages/EditInvoice.jsx";
import NewInvoice from "./pages/NewInvoice.jsx";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-slate-900 dark:text-gray-100 transition-colors duration-300">
      {/* Dark Mode Toggle Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-5 right-5 z-50 px-4 py-2 rounded-full bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-all flex items-center gap-2 border border-gray-200 dark:border-slate-700 font-medium text-sm"
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<InvoiceList />} />
          <Route path="/invoice/:id" element={<InvoiceDetail />} />
          <Route path="/edit/:id" element={<EditInvoice />} />
          <Route path="/new" element={<NewInvoice />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;