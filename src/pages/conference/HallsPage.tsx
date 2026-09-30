import {
  FiPlus,
  FiEdit,
  FiVideo,
  FiMic,
  FiCheckCircle,
  FiAlertTriangle,
} from "react-icons/fi";

export default function ConferenceHallsPage() {
  const halls = [
    {
      name: "Conference Hall A",
      capacity: 300,
      av: ["video", "mic"],
      status: "Available",
    },
    {
      name: "Seminar Room B",
      capacity: 120,
      av: ["video"],
      status: "Maintenance",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">Conference Halls</h1>
          <p className="text-sm text-gray-500">
            Manage conference and seminar halls
          </p>
        </div>

        <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md text-sm">
          <FiPlus />
          Add Hall
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Hall</th>
              <th className="p-3 text-left">Capacity</th>
              <th className="p-3 text-left">AV Facilities</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {halls.map((h, i) => (
              <tr
                key={i}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-3 font-medium">{h.name}</td>

                <td className="p-3">{h.capacity}</td>

                <td className="p-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    {h.av.includes("video") && <FiVideo title="Projector / LED" />}
                    {h.av.includes("mic") && <FiMic title="Microphone" />}
                  </div>
                </td>

                <td className="p-3">
                  <StatusBadge status={h.status} />
                </td>

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
  if (status === "Available") {
    return (
      <span className="inline-flex items-center gap-1 text-green-700 bg-green-100 px-2 py-1 rounded-full text-xs">
        <FiCheckCircle />
        Available
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-orange-700 bg-orange-100 px-2 py-1 rounded-full text-xs">
      <FiAlertTriangle />
      Maintenance
    </span>
  );
}
