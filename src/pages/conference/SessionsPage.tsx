import {
  FiPlus,
  FiEdit,
  FiClock,
  FiMapPin,
  FiUser,
  FiTag,
} from "react-icons/fi";

export default function SessionsPage() {
  const sessions = [
    {
      title: "Future of FoodTech",
      hall: "Conference Hall A",
      time: "10:00 – 11:00",
      speaker: "Dr. Arjun Kumar",
      type: "Panel",
      status: "Upcoming",
    },
    {
      title: "Packaging Innovations",
      hall: "Seminar Room B",
      time: "11:30 – 12:30",
      speaker: "Meera Shah",
      type: "Talk",
      status: "Ongoing",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">Sessions</h1>
          <p className="text-sm text-gray-500">
            Manage conference sessions and schedules
          </p>
        </div>

        <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md text-sm">
          <FiPlus />
          Create Session
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Session</th>
              <th className="p-3 text-left">Details</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {sessions.map((s, i) => (
              <tr
                key={i}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* Session */}
                <td className="p-3 font-medium">{s.title}</td>

                {/* Details */}
                <td className="p-3 space-y-1 text-gray-600">
                  <div className="flex items-center gap-2">
                    <FiClock /> {s.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <FiMapPin /> {s.hall}
                  </div>
                  <div className="flex items-center gap-2">
                    <FiUser /> {s.speaker}
                  </div>
                </td>

                {/* Type */}
                <td className="p-3">
                  <span className="inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full text-xs">
                    <FiTag />
                    {s.type}
                  </span>
                </td>

                {/* Status */}
                <td className="p-3">
                  <StatusBadge status={s.status} />
                </td>

                {/* Action */}
                <td className="p-3 text-right">
                  <button className="text-gray-600 hover:text-black">
                    <FiEdit />
                  </button>
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
  const map: any = {
    Upcoming: "bg-blue-100 text-blue-700",
    Ongoing: "bg-green-100 text-green-700",
    Completed: "bg-gray-100 text-gray-700",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${map[status]}`}>
      {status}
    </span>
  );
}
