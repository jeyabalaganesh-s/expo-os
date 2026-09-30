// src/pages/customer/BadgePage.tsx

import type { ReactElement } from "react";
import { FaQrcode, FaPrint, FaDownload } from "react-icons/fa";

export default function BadgePage(): ReactElement {
  return (
    <div className="max-w-sm mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-xl font-semibold text-gray-900">
          Exhibitor Badge
        </h1>
        <p className="text-sm text-gray-500">
          Show this badge at the event entry
        </p>
      </div>

      {/* Badge Card */}
      <div className="bg-white border rounded-xl shadow-sm p-5 text-center space-y-4">
        {/* Company Info */}
        <div>
          <div className="text-lg font-semibold text-gray-900">
            SpiceHub Pvt Ltd
          </div>
          <div className="text-sm text-gray-500">
            Stall A12
          </div>
        </div>

        {/* QR Code */}
        <div className="w-36 h-36 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
          <FaQrcode className="text-5xl text-gray-500" />
        </div>

        {/* Badge Status */}
        <div className="text-xs text-green-600 font-medium">
          ✔ Entry Enabled
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition">
          <FaPrint />
          Print Badge
        </button>

        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 transition">
          <FaDownload />
          Download PDF
        </button>
      </div>

      {/* Info */}
      <div className="bg-gray-50 border rounded-lg p-3 text-xs text-gray-600 text-center">
        Please ensure this badge is available (printed or digital)
        during entry for verification.
      </div>
    </div>
  );
}
