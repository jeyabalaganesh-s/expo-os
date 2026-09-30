// src/pages/members/Membership.tsx
import { Crown, CheckCircle, Calendar, ArrowRight } from "lucide-react";

export default function Membership() {
  return (
    <div className="max-w-4xl space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Membership
        </h2>
        <p className="text-gray-500 mt-1">
          Manage your SUKA Circle membership
        </p>
      </div>

      {/* ================= CURRENT PLAN ================= */}
      <div className="bg-white rounded-xl p-6 flex flex-col sm:flex-row justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Crown className="text-orange-600" size={22} />
            <h3 className="text-xl font-semibold text-gray-800">
              Pro Member
            </h3>
          </div>

          <p className="text-gray-600 mb-4">
            Full access to members-only events, resources, and
            community networking.
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Calendar size={14} /> Valid till:{" "}
              <strong>31 Dec 2026</strong>
            </span>
            <span className="flex items-center gap-1 text-green-600">
              <CheckCircle size={14} /> Active
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-3">
          <button className="px-5 py-2 rounded-lg bg-orange-600 text-white text-sm hover:bg-orange-700">
            Renew Membership
          </button>
          <button className="px-5 py-2 rounded-lg border text-sm text-gray-700 hover:bg-gray-50">
            Upgrade Plan
          </button>
        </div>
      </div>

      {/* ================= BENEFITS ================= */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Your Benefits
        </h3>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
          <li className="flex items-center gap-2">
            <CheckCircle size={16} className="text-orange-600" />
            Access to members-only webinars
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle size={16} className="text-orange-600" />
            Community networking
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle size={16} className="text-orange-600" />
            Downloadable resources
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle size={16} className="text-orange-600" />
            Priority event access
          </li>
        </ul>
      </div>

      {/* ================= UPGRADE CTA ================= */}
      <div className="bg-orange-50 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-orange-700">
            Want more from SUKA Circle?
          </h3>
          <p className="text-sm text-orange-600">
            Unlock mentorship, recordings, and exclusive sessions.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-orange-600 text-white text-sm hover:bg-orange-700">
          View Premium Plans
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
