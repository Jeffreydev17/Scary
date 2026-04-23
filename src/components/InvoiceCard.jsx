import { useNavigate } from "react-router-dom";

function InvoiceCard({ invoice }) {
  const navigate = useNavigate();

  const getStatusStyles = () => {
    switch (invoice.status) {
      case "paid":
        return "bg-green-100 text-green-600";
      case "pending":
        return "bg-orange-100 text-orange-600";
      case "draft":
        return "bg-gray-100 text-gray-500";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div
      onClick={() => navigate(`/invoice/${invoice.id}`)}
      className="group bg-white rounded-xl p-5 mb-3 cursor-pointer transition-all duration-200 border border-transparent hover:border-purple-500 hover:shadow-md"
    >
      {/* Mobile Layout (shows on small screens) */}
      <div className="block md:hidden">
        <div className="flex justify-between items-start mb-4">
          <p className="font-bold text-base">
            <span className="text-gray-400">#</span>
            {invoice.id}
          </p>
          <p className="text-gray-400 text-sm">{invoice.clientName}</p>
        </div>
        
        <div className="flex justify-between items-end">
          <div>
            <p className="text-gray-600 text-xs mb-1">Due {formatDate(invoice.paymentDue)}</p>
            <p className="font-bold text-xl">₦{invoice.total.toLocaleString()}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize ${getStatusStyles()}`}>
              {invoice.status}
            </span>
            <span className="text-purple-500 text-xl group-hover:translate-x-1 transition-transform">›</span>
          </div>
        </div>
      </div>

      {/* Desktop Layout (shows on medium screens and up) */}
      <div className="hidden md:flex justify-between items-center">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-6">
          <p className="font-bold text-base">
            <span className="text-gray-400">#</span>
            {invoice.id}
          </p>

          <p className="text-gray-400 text-sm">
            Due {formatDate(invoice.paymentDue)}
          </p>

          <p className="text-gray-800 font-medium">{invoice.clientName}</p>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-6">
          <p className="font-bold text-base">₦{invoice.total.toLocaleString()}</p>

          <span className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize ${getStatusStyles()}`}>
            {invoice.status}
          </span>

          {/* Arrow icon */}
          <span className="text-purple-500 text-xl group-hover:translate-x-1 transition-transform">›</span>
        </div>
      </div>
    </div>
  );
}

export default InvoiceCard;