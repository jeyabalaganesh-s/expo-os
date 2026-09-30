import { useState } from "react";

export default function CreativeTasksPage() {
  const [filter, setFilter] = useState("All");

  const tasks = [
    {
      id: "T-001",
      title: "FoodPreneur Standee Design",
      type: "Design",
      deadline: "Today",
      priority: "High",
      status: "In Progress",
    },
    {
      id: "T-002",
      title: "Sponsor Backdrop Printing",
      type: "Flex",
      deadline: "Tomorrow",
      priority: "Medium",
      status: "Pending",
    },
    {
      id: "T-003",
      title: "LED Visual Loop",
      type: "Video",
      deadline: "14 Dec",
      priority: "Low",
      status: "Completed",
    },
  ];

  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((t) => t.status === filter);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Assigned Tasks</h1>

        {/* Filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded-md px-3 py-1 text-sm"
        >
          <option>All</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.map((t) => (
          <div
            key={t.id}
            className="bg-white border rounded-lg p-4 hover:shadow-sm transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{t.title}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Task ID: {t.id} • {t.type}
                </p>
              </div>

              <StatusBadge status={t.status} />
            </div>

            <div className="flex justify-between items-center mt-4 text-sm">
              <div className="flex gap-4 text-gray-600">
                <span>🕒 {t.deadline}</span>
                <span>⚡ {t.priority}</span>
              </div>

              <button className="text-blue-600 text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <p className="text-sm text-gray-500 text-center mt-6">
            No tasks found
          </p>
        )}
      </div>
    </div>
  );
}

/* -----------------------
   Helpers
------------------------*/

function StatusBadge({ status }: { status: string }) {
  const map: any = {
    Pending: "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${map[status]}`}>
      {status}
    </span>
  );
}
