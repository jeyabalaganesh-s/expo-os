// src/pages/members/SecurityReviewPage.tsx
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function SecurityReviewPage() {
  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-3">
        <Link
          to="/members/blocked"
          className="p-2 border rounded-md hover:bg-gray-50"
        >
          <ArrowLeft size={16} />
        </Link>

        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Security Review
          </h1>
          <p className="text-sm text-gray-500">
            Review blocked members and take corrective actions
          </p>
        </div>
      </div>

      {/* ================= SUMMARY CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-xl p-4">
          <p className="text-sm text-gray-500">Total Blocked</p>
          <p className="text-2xl font-semibold">24</p>
        </div>

        <div className="bg-white border rounded-xl p-4">
          <p className="text-sm text-gray-500">Fraud Suspected</p>
          <p className="text-2xl font-semibold text-purple-600">6</p>
        </div>

        <div className="bg-white border rounded-xl p-4">
          <p className="text-sm text-gray-500">Policy Violations</p>
          <p className="text-2xl font-semibold text-red-600">10</p>
        </div>

        <div className="bg-white border rounded-xl p-4">
          <p className="text-sm text-gray-500">Payment Issues</p>
          <p className="text-2xl font-semibold text-yellow-600">8</p>
        </div>
      </div>

      {/* ================= ACTION PANEL ================= */}
      <div className="bg-white border rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-red-600">
          <ShieldAlert size={18} />
          <h2 className="font-semibold">Security Actions</h2>
        </div>

        <ul className="text-sm text-gray-700 space-y-2">
          <li>• Review fraud suspected members</li>
          <li>• Validate payment disputes</li>
          <li>• Audit admin manual blocks</li>
          <li>• Unblock eligible members</li>
          <li>• Escalate critical cases</li>
        </ul>
      </div>
    </div>
  );
}
