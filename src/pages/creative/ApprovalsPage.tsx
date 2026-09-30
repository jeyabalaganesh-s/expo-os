import { useState } from "react";

export default function ApprovalsPage() {
  const [selected, setSelected] = useState<any>(null);

  const approvals = [
    {
      id: "A-001",
      title: "Main Stage Backdrop",
      type: "Flex / Standee",
      version: "v2",
      submittedOn: "12 Dec 2025",
      status: "Pending",
      reviewer: "Event Manager",
    },
    {
      id: "A-002",
      title: "Sponsor LED Visual",
      type: "Video",
      version: "v1",
      submittedOn: "11 Dec 2025",
      status: "Approved",
      reviewer: "Marketing Lead",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Approvals</h1>
        <span className="text-sm text-gray-500">
          {approvals.filter(a => a.status === "Pending").length} pending
        </span>
      </div>

      {/* Approval List */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left p-3">Work</th>
              <th className="text-left p-3">Type</th>
              <th className="text-left p-3">Version</th>
              <th className="text-left p-3">Reviewer</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {approvals.map((a) => (
              <tr key={a.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">{a.title}</td>
                <td className="p-3">{a.type}</td>
                <td className="p-3">{a.version}</td>
                <td className="p-3">{a.reviewer}</td>
                <td className="p-3">
                  <StatusBadge status={a.status} />
                </td>
                <td className="p-3">
                  <button
                    onClick={() => setSelected(a)}
                    className="text-blue-600 text-sm"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Side Preview / Detail Panel */}
      {selected && (
        <div className="bg-white border rounded-lg p-5 space-y-4">
          <div className="flex justify-between">
            <h2 className="font-semibold">{selected.title}</h2>
            <button
              onClick={() => setSelected(null)}
              className="text-sm text-gray-500"
            >
              Close
            </button>
          </div>

          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Type:</strong> {selected.type}</p>
            <p><strong>Version:</strong> {selected.version}</p>
            <p><strong>Submitted On:</strong> {selected.submittedOn}</p>
            <p><strong>Reviewer:</strong> {selected.reviewer}</p>
          </div>

          {/* Preview Placeholder */}
          <div className="h-40 border rounded-lg flex items-center justify-center text-gray-400 text-sm">
            Preview Area (Image / Video / PDF)
          </div>

          {/* Action Buttons */}
          {selected.status === "Pending" && (
            <div className="flex gap-3">
              <button className="flex-1 bg-green-600 text-white py-2 rounded-md">
                Mark as Approved
              </button>
              <button className="flex-1 bg-red-600 text-white py-2 rounded-md">
                Needs Revision
              </button>
            </div>
          )}

          {selected.status === "Approved" && (
            <p className="text-green-600 text-sm font-medium">
              ✔ Approved
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/* -----------------------
   Helper
------------------------*/
function StatusBadge({ status }: { status: string }) {
  const map: any = {
    Pending: "bg-yellow-100 text-yellow-700",
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${map[status]}`}>
      {status}
    </span>
  );
}
