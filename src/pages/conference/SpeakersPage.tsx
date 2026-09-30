import { FiPlus, FiUser, FiBriefcase, FiEdit } from "react-icons/fi";

export default function SpeakersPage() {
  const speakers = [
    {
      name: "Dr. Arjun Kumar",
      org: "FoodTech India",
      sessions: 2,
    },
    {
      name: "Meera Shah",
      org: "Organic Brands",
      sessions: 1,
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">Speakers</h1>
          <p className="text-sm text-gray-500">
            Manage speakers and their session assignments
          </p>
        </div>

        <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md text-sm">
          <FiPlus />
          Add Speaker
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Speaker</th>
              <th className="p-3 text-left">Organization</th>
              <th className="p-3 text-left">Sessions</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {speakers.map((s, i) => (
              <tr
                key={i}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* Speaker */}
                <td className="p-3">
                  <div className="flex items-center gap-2 font-medium">
                    <FiUser className="text-gray-500" />
                    {s.name}
                  </div>
                </td>

                {/* Org */}
                <td className="p-3 text-gray-600">
                  <div className="flex items-center gap-2">
                    <FiBriefcase />
                    {s.org}
                  </div>
                </td>

                {/* Sessions */}
                <td className="p-3">
                  <span className="inline-flex items-center justify-center bg-gray-100 px-3 py-1 rounded-full text-xs">
                    {s.sessions}
                  </span>
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
