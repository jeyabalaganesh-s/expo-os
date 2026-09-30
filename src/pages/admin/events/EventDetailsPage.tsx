// src/pages/events/EventDetailsPage.tsx
import { useState } from "react";
import {
  CalendarDays,
  MapPin
} from "lucide-react";

type Tab =
  | "overview"
  | "stalls"
  | "bookings"
  | "finance"
  | "settings";

export default function EventDetailsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const event = {
    id: "EVT-001",
    name: "SUKA Food Expo – Coimbatore",
    type: "Expo",
    city: "Coimbatore",
    venue: "Codissia Trade Centre",
    startDate: "20 Mar 2025",
    endDate: "22 Mar 2025",
    status: "Published",
    visibility: "Public",
  };

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="bg-white border rounded-xl p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {event.name}
            </h1>
            <p className="text-sm text-gray-500">
              {event.id} • {event.type}
            </p>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            {event.status}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={16} />
            {event.city}, {event.venue}
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <CalendarDays size={16} />
            {event.startDate} – {event.endDate}
          </div>
          <div className="text-gray-600">
            Visibility: <b>{event.visibility}</b>
          </div>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="border-b flex gap-6 text-sm font-medium">
        {[
          { key: "overview", label: "Overview" },
          { key: "stalls", label: "Stalls" },
          { key: "bookings", label: "Bookings" },
          { key: "finance", label: "Finance" },
          { key: "settings", label: "Settings" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as Tab)}
            className={`pb-3 ${
              activeTab === tab.key
                ? "border-b-2 border-orange-600 text-orange-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ================= TAB CONTENT ================= */}
      {activeTab === "overview" && <OverviewTab />}
      {activeTab === "stalls" && <StallsTab />}
      {activeTab === "bookings" && <BookingsTab />}
      {activeTab === "finance" && <FinanceTab />}
      {activeTab === "settings" && <SettingsTab />}
    </div>
  );
}

/* ================= TAB COMPONENTS ================= */

function OverviewTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard title="Total Stalls" value="120" />
      <StatCard title="Booked Stalls" value="82" />
      <StatCard title="Revenue" value="₹24,60,000" />
    </div>
  );
}

function StallsTab() {
  return (
    <div className="bg-white border rounded-xl p-6">
      <h3 className="font-semibold mb-4">Stall Management</h3>
      <p className="text-sm text-gray-600 mb-4">
        Manage stall map, pricing, and availability.
      </p>

      <div className="flex gap-3">
        <button className="px-4 py-2 bg-orange-600 text-white rounded-md text-sm">
          Open Stall Map
        </button>
        <button className="px-4 py-2 border rounded-md text-sm">
          Configure Pricing
        </button>
      </div>
    </div>
  );
}

function BookingsTab() {
  return (
    <div className="bg-white border rounded-xl p-6">
      <h3 className="font-semibold mb-4">Bookings</h3>

      <table className="w-full text-sm">
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="text-left py-2">Company</th>
            <th className="text-left py-2">Stall</th>
            <th className="text-left py-2">Amount</th>
            <th className="text-left py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-3">ABC Foods</td>
            <td className="py-3">A12</td>
            <td className="py-3">₹50,000</td>
            <td className="py-3 text-green-600">Confirmed</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function FinanceTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard title="Total Collection" value="₹24,60,000" />
      <StatCard title="Pending Payments" value="₹3,40,000" />
      <StatCard title="Refunds" value="₹1,00,000" />
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="bg-white border rounded-xl p-6 space-y-4">
      <h3 className="font-semibold">Event Settings</h3>

      <button className="px-4 py-2 border rounded-md text-sm">
        Edit Event Details
      </button>

      <button className="px-4 py-2 border rounded-md text-sm text-red-600">
        Cancel Event
      </button>
    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="bg-white border rounded-xl p-5">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold text-gray-900 mt-1">
        {value}
      </h2>
    </div>
  );
}
