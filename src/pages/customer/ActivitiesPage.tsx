// src/pages/customer/ActivitiesPage.tsx

import {
  FaCheckCircle,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaQrcode,
  FaClipboardCheck,
} from "react-icons/fa";
import type { ReactElement } from "react";

type ActivityType =
  | "booking_confirmed"
  | "stall_assigned"
  | "payment_received"
  | "qr_generated"
  | "checked_in";

type Activity = {
  id: string;
  type: ActivityType;
  label: string;
  date: string;
};

const ACTIVITIES: Activity[] = [
  {
    id: "A1",
    type: "booking_confirmed",
    label: "Booking confirmed",
    date: "01 Feb 2025 • 10:30 AM",
  },
  {
    id: "A2",
    type: "stall_assigned",
    label: "Stall A12 assigned",
    date: "02 Feb 2025 • 04:15 PM",
  },
  {
    id: "A3",
    type: "payment_received",
    label: "Payment of ₹50,000 received",
    date: "03 Feb 2025 • 11:00 AM",
  },
  {
    id: "A4",
    type: "qr_generated",
    label: "Entry QR generated",
    date: "05 Feb 2025 • 09:45 AM",
  },
  {
    id: "A5",
    type: "checked_in",
    label: "Checked in at event gate",
    date: "12 Feb 2025 • 08:55 AM",
  },
];
export default function ActivitiesPage(): ReactElement {
  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">
          Activity Timeline
        </h1>
        <p className="text-sm text-gray-500">
          Track every important step of your booking and event journey.
        </p>
      </div>

      {/* Timeline */}
      <div className="bg-white border rounded-xl shadow-sm p-5">
        <ul className="relative space-y-6">
          {ACTIVITIES.map((a, index) => (
            <li key={a.id} className="flex gap-4">
              {/* Timeline Column */}
              <div className="relative flex flex-col items-center">
                <ActivityIcon type={a.type} />
                {index !== ACTIVITIES.length - 1 && (
                  <span className="absolute top-10 h-full w-px bg-gray-200" />
                )}
              </div>

              {/* Content */}
              <div className="pb-2">
                <div className="text-sm font-medium text-gray-900">
                  {a.label}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {a.date}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
        <strong>Note:</strong> This timeline is for reference only.
        For any discrepancy, please contact event support.
      </div>
    </div>
  );

/* -----------------------
   Activity Icon
----------------------- */
function ActivityIcon({
  type,
}: {
  type: ActivityType;
}): ReactElement {
  const config: Record<
    ActivityType,
    {
      icon: ReactElement;
      bg: string;
      text: string;
    }
  > = {

    booking_confirmed: {
      icon: <FaClipboardCheck />,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    stall_assigned: {
      icon: <FaMapMarkerAlt />,
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
    payment_received: {
      icon: <FaMoneyBillWave />,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    qr_generated: {
      icon: <FaQrcode />,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
    checked_in: {
      icon: <FaCheckCircle />,
      bg: "bg-emerald-100",
      text: "text-emerald-600",
    },
  };

  const { icon, bg, text } = config[type];

  return (
    <div
      className={`w-9 h-9 flex items-center justify-center rounded-full ${bg} ${text} shadow-sm`}
    >
      {icon}
    </div>
  );
}
}
