import {
  FiPlus,
  FiSend,
  FiMail,
  FiMessageSquare,
  FiEye,
  FiEdit,
} from "react-icons/fi";

export default function CampaignsPage() {
  const campaigns = [
    {
      id: "CAMP-001",
      name: "Exhibitor Reminder",
      channel: "WhatsApp",
      status: "Sent",
      sentOn: "12 Dec 2025",
    },
    {
      id: "CAMP-002",
      name: "Visitor Registration Push",
      channel: "Email",
      status: "Draft",
      sentOn: "-",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">Campaigns</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage WhatsApp and Email campaigns
          </p>
        </div>

        <a href="/communications/campaign/create">
        <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md text-sm">
          <FiPlus />
          New Campaign
        </button>
      </a>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left p-3">Campaign</th>
              <th className="text-left p-3">Channel</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Sent On</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {campaigns.map((c) => (
              <tr
                key={c.id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* Campaign Name */}
                <td className="p-3 font-medium">{c.name}</td>

                {/* Channel */}
                <td className="p-3">
                  <ChannelBadge channel={c.channel} />
                </td>

                {/* Status */}
                <td className="p-3">
                  <StatusBadge status={c.status} />
                </td>

                {/* Sent Date */}
                <td className="p-3 text-gray-600">{c.sentOn}</td>

                {/* Actions */}
                <td className="p-3 text-right">
                  <div className="flex justify-end gap-3 text-gray-600">
                    <button title="View">
                      <FiEye />
                    </button>
                    {c.status === "Draft" && (
                      <button title="Edit">
                        <FiEdit />
                      </button>
                    )}
                    {c.status === "Draft" && (
                      <button
                        title="Send"
                        className="text-green-600"
                      >
                        <FiSend />
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
  if (status === "Sent") {
    return (
      <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
        <FiSend />
        Sent
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
      Draft
    </span>
  );
}

function ChannelBadge({ channel }: { channel: string }) {
  if (channel === "WhatsApp") {
    return (
      <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs">
        <FiMessageSquare />
        WhatsApp
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">
      <FiMail />
      Email
    </span>
  );
}
