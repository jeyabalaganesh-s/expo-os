export default function TemplatesPage() {
  const templates = [
    {
      id: "TMP-001",
      name: "Exhibitor Welcome",
      channel: "WhatsApp",
      status: "Approved",
    },
    {
      id: "TMP-002",
      name: "Payment Reminder",
      channel: "Email",
      status: "Pending",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Message Templates
          </h1>
          <p className="text-sm text-gray-500">
            Manage WhatsApp & Email templates used across campaigns
          </p>
        </div>
      <a href="/communications/template/create">
        <button className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-900 transition">
          + Create Template
        </button>
      </a>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wide">
            <tr>
              <th className="text-left px-5 py-3">Template Name</th>
              <th className="text-left px-5 py-3">Channel</th>
              <th className="text-left px-5 py-3">Status</th>
              <th className="text-right px-5 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {templates.map((t) => (
              <tr
                key={t.id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* Name */}
                <td className="px-5 py-4">
                  <div className="font-medium text-gray-900">
                    {t.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    ID: {t.id}
                  </div>
                </td>

                {/* Channel */}
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      t.channel === "WhatsApp"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {t.channel}
                  </span>
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      t.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {t.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-5 py-4 text-right">
                  <div className="inline-flex gap-2">
                    <button className="text-xs px-3 py-1.5 rounded-md border hover:bg-gray-100 transition">
                      View
                    </button>
                    <button className="text-xs px-3 py-1.5 rounded-md border hover:bg-gray-100 transition">
                      Edit
                    </button>
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
