// src/pages/customer/MyBookingPage.tsx
import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

export default function MyBookingPage() {
  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Booking</h1>
        <p className="text-sm text-gray-500 mt-1">
          Quick overview of your event booking.
        </p>
      </div>

      {/* Summary Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">
              SUKA Food Expo 2025
            </h2>

            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                12–14 Feb 2025
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                Chennai Trade Centre
              </span>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-3">
            <StatusBadge label="Confirmed" color="green" />
            <StatusBadge label="Paid" color="blue" />
          </div>
        </div>

        {/* Key Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-6">
          <MiniField label="Company" value="SpiceHub Pvt Ltd" />
          <MiniField label="Booking ID" value="BK-2025-0012" />
          <MiniField label="Stall" value="A12" />
          <MiniField label="Type" value="Exhibitor" />
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NavCard
          title="Booking Details"
          description="View full booking, stall, and allocation details."
          to="/customer/booking/details"
        />
        <NavCard
          title="Event Information"
          description="Event schedule, venue, and hall details."
          to="/customer/booking/event"
        />
        <NavCard
          title="Contact Information"
          description="Registered contact person details."
          to="/customer/booking/contact"
        />
        <NavCard
          title="Payments & Invoices"
          description="View invoices, receipts, and payment history."
          to="/customer/booking/payments"
        />
      </div>
    </div>
  );
}

/* -----------------------
   Small Components
----------------------- */

function MiniField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="font-medium text-gray-900">{value}</div>
    </div>
  );
}

function StatusBadge({
  label,
  color,
}: {
  label: string;
  color: "green" | "blue" | "yellow";
}) {
  const map = {
    green: "bg-green-50 text-green-700 border-green-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full border ${map[color]}`}
    >
      {label}
    </span>
  );
}

function NavCard({
  title,
  description,
  to,
}: {
  title: string;
  description: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
        <ArrowRight
          size={18}
          className="text-gray-400 group-hover:text-gray-900 transition"
        />
      </div>
    </Link>
  );
}
