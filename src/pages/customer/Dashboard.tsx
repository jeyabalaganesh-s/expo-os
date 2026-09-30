// src/pages/customer/CustomerDashboard.tsx

import { useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaStore,
  FaMoneyBillWave,
  FaArrowRight,
  FaQrcode,
  FaPalette,
} from "react-icons/fa";
import type { ReactElement } from "react";

export default function CustomerDashboard(): ReactElement {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">
          Welcome 👋
        </h1>
        <p className="text-sm text-gray-500">
          Here’s a quick overview of your expo participation
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          label="Booking"
          value="Confirmed"
          icon={<FaCheckCircle />}
          onClick={() => navigate("/customer/booking")}
        />
        <StatCard
          label="Stall"
          value="A12"
          icon={<FaStore />}
          onClick={() => navigate("/customer/stall")}
        />
        <StatCard
          label="Payment"
          value="Paid"
          icon={<FaMoneyBillWave />}
          onClick={() => navigate("/customer/payments")}
        />
      </div>

      {/* Next Actions */}
      <div className="bg-white border rounded-xl p-4 space-y-3">
        <h3 className="font-medium">Next Actions</h3>

        <ActionItem
          label="Upload branding materials"
          onClick={() => navigate("/customer/branding")}
          icon={<FaPalette />}
        />

        <ActionItem
          label="View QR Pass"
          onClick={() => navigate("/customer/qr")}
          icon={<FaQrcode />}
        />

        <ActionItem
          label="Download Badge"
          onClick={() => navigate("/customer/badge")}
          icon={<FaArrowRight />}
        />
      </div>

      {/* Recent Activity */}
      <div
        onClick={() => navigate("/customer/activity")}
        className="bg-gray-50 border rounded-xl p-4 text-sm text-gray-600 cursor-pointer hover:bg-gray-100"
      >
        View recent activity →
      </div>
    </div>
  );
}

/* ===============================
   Components
================================ */

function StatCard({
  label,
  value,
  icon,
  onClick,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="bg-white border rounded-xl p-4 cursor-pointer hover:shadow-sm transition"
    >
      <div className="flex items-center gap-2 text-xs text-gray-500">
        {icon}
        {label}
      </div>
      <div className="text-lg font-semibold mt-1">
        {value}
      </div>
    </div>
  );
}

function ActionItem({
  label,
  onClick,
  icon,
}: {
  label: string;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between text-sm cursor-pointer hover:bg-gray-50 p-2 rounded"
    >
      <div className="flex items-center gap-2">
        {icon}
        {label}
      </div>
      <FaArrowRight className="text-gray-400" />
    </div>
  );
}
