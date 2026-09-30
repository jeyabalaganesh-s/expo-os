import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function TaskDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Pending");

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-blue-600"
      >
        ← Back to Tasks
      </button>

      <div className="bg-white rounded-xl shadow p-5 space-y-3">
        <h2 className="text-xl font-semibold">Task #{id}</h2>

        <div className="text-sm text-gray-600 space-y-1">
          <p><strong>Location:</strong> Stall B12</p>
          <p><strong>Assigned By:</strong> Ops Manager</p>
          <p><strong>Due Time:</strong> Today, 4:00 PM</p>
        </div>

        <div className="border-t pt-4 space-y-3">
          <label className="block text-sm font-medium">
            Update Status
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <label className="block text-sm font-medium mt-4">
            Upload Proof (Photo)
          </label>

          <input
            type="file"
            accept="image/*"
            className="w-full text-sm"
          />

          <button className="w-full mt-4 bg-black text-white py-2 rounded-lg">
            Update Task
          </button>
        </div>
      </div>
    </div>
  );
}
