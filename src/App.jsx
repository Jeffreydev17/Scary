import { BrowserRouter, Routes, Route } from "react-router-dom";
import InvoiceList from "./pages/InvoiceList.jsx";
import InvoiceDetail from "./pages/InvoiceDetails.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InvoiceList />} />
        <Route path="/invoice/:id" element={<InvoiceDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;