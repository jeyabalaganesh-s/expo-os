import {
  FiCheckCircle,
  FiXCircle,
  FiMail,
  FiMessageSquare,
  FiEye,
  FiRefreshCw,
} from "react-icons/fi";

export default function MessageLogsPage() {
  const logs = [
    {
      id: "LOG-001",
      recipient: "SpiceHub Pvt Ltd",
      channel: "WhatsApp",
      status: "Delivered",
      time: "12 Dec, 10:45 AM",
    },
    {
      id: "LOG-002",
      recipient: "FreshFoods",
      channel: "Email",
      status: "Failed",
      time: "12 Dec, 10:50 AM",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Message Logs</h1>
        <p className="text-sm text-gray-500 mt-1">
          Delivery status and communication audit trail
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left p-3">Recipient</th>
              <th className="text-left p-3">Channel</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Time</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((l) => (
              <tr key={l.id} className="border-t hover:bg-gray-50 transition">
                <td className="p-3 font-medium">{l.recipient}</td>

                <td className="p-3">
                  <ChannelBadge channel={l.channel} />
                </td>

                <td className="p-3">
                  <StatusBadge status={l.status} />
                </td>

                <td className="p-3">{l.time}</td>

                <td className="p-3 text-right">
                  <div className="flex justify-end gap-3">
                    <button
                      title="View Message"
                      className="text-gray-600 hover:text-black"
                    >
                      <FiEye />
                    </button>

                    {l.status === "Failed" && (
                      <button
                        title="Retry"
                        className="text-gray-600 hover:text-black"
                      >
                        <FiRefreshCw />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* -----------------------
   Helpers
------------------------*/

function StatusBadge({ status }: { status: string }) {
  if (status === "Delivered") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
        <FiCheckCircle />
        Delivered
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-red-100 text-red-700">
      <FiXCircle />
      Failed
    </span>
  );
}

function ChannelBadge({ channel }: { channel: string }) {
  if (channel === "WhatsApp") {
    return (
      <span className="inline-flex items-center gap-1 text-green-700 bg-green-50 px-2 py-1 rounded-full text-xs">
        <FiMessageSquare />
        WhatsApp
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-blue-700 bg-blue-50 px-2 py-1 rounded-full text-xs">
      <FiMail />
      Email
    </span>
  );
}
