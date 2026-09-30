import { useState } from "react";

export default function UploadsPage() {
  const [task, setTask] = useState("");
  const [note, setNote] = useState("");

  const recentUploads = [
    {
      name: "Main_Stage_Backdrop_v2.pdf",
      task: "Main Stage Backdrop",
      uploadedOn: "12 Dec 2025",
      status: "Pending Approval",
    },
    {
      name: "Sponsor_LED_Visual_v1.mp4",
      task: "Sponsor LED Visual",
      uploadedOn: "11 Dec 2025",
      status: "Approved",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Uploads</h1>
        <p className="text-sm text-gray-500 mt-1">
          Upload designs, videos, and print-ready files for approval
        </p>
      </div>

      {/* Upload Form */}
      <div className="bg-white border rounded-lg p-5 space-y-4">
        <h2 className="font-medium">Upload New Work</h2>

        <div className="space-y-3 text-sm">
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Related Task
            </label>
            <select
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="">Select task</option>
              <option>Main Stage Backdrop</option>
              <option>FoodPreneur Standee Design</option>
              <option>Sponsor LED Visual</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Upload File
            </label>
            <input
              type="file"
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Notes / Version info
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Example: Updated colors as per feedback"
              className="w-full border rounded-md px-3 py-2"
              rows={3}
            />
          </div>

          <button className="bg-black text-white px-4 py-2 rounded-md mt-2">
            Upload for Approval
          </button>
        </div>
      </div>

      {/* Recent Uploads */}
      <div className="bg-white border rounded-lg p-5">
        <h2 className="font-medium mb-4">Recent Uploads</h2>

        <div className="space-y-3 text-sm">
          {recentUploads.map((u, i) => (
            <div
              key={i}
              className="flex justify-between items-center border rounded-md p-3"
            >
              <div>
                <p className="font-medium">{u.name}</p>
                <p className="text-xs text-gray-500">
                  {u.task} • {u.uploadedOn}
                </p>
              </div>

              <StatusBadge status={u.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -----------------------
   Helper
------------------------*/
function StatusBadge({ status }: { status: string }) {
  const map: any = {
    "Pending Approval": "bg-yellow-100 text-yellow-700",
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${map[status]}`}>
      {status}
    </span>
  );
}
