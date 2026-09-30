import {
  FiUsers,
  FiEye,
  FiDownload,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

export default function RegistrationsPage() {
  const sessions = [
    {
      title: "Future of FoodTech",
      hall: "Conference Hall A",
      registered: 186,
      capacity: 300,
    },
    {
      title: "Packaging Innovations",
      hall: "Seminar Room B",
      registered: 120,
      capacity: 120,
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Session Registrations</h1>
        <p className="text-sm text-gray-500 mt-1">
          Track registrations and attendance by session
        </p>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Session</th>
              <th className="p-3 text-left">Hall</th>
              <th className="p-3 text-left">Registrations</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {sessions.map((s, i) => {
              const percent = Math.round(
                (s.registered / s.capacity) * 100
              );
              const isFull = s.registered >= s.capacity;

              return (
                <tr
                  key={i}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium">
                    <div className="flex items-center gap-2">
                      <FiUsers className="text-gray-500" />
                      {s.title}
                    </div>
                  </td>

                  <td className="p-3">{s.hall}</td>

                  <td className="p-3">
                    <p className="font-medium">
                      {s.registered} / {s.capacity}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className={`h-2 rounded-full ${
                          isFull
                            ? "bg-red-500"
                            : percent > 70
                            ? "bg-orange-500"
                            : "bg-green-500"
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </td>

                  <td className="p-3">
                    <StatusBadge
                      status={isFull ? "Full" : percent > 70 ? "Limited" : "Open"}
                    />
                  </td>

                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-3">
                      <button
                        title="View Registrations"
                        className="text-gray-600 hover:text-black"
                      >
                        <FiEye />
                      </button>
                      <button
                        title="Export List"
                        className="text-gray-600 hover:text-black"
                      >
                        <FiDownload />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
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
  if (status === "Open") {
    return (
      <span className="inline-flex items-center gap-1 text-green-700 bg-green-100 px-2 py-1 rounded-full text-xs">
        <FiCheckCircle />
        Open
      </span>
    );
  }

  if (status === "Limited") {
    return (
      <span className="inline-flex items-center gap-1 text-orange-700 bg-orange-100 px-2 py-1 rounded-full text-xs">
        <FiAlertCircle />
        Limited
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-red-700 bg-red-100 px-2 py-1 rounded-full text-xs">
      <FiAlertCircle />
      Full
    </span>
  );
}
