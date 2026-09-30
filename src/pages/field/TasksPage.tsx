import { useNavigate } from "react-router-dom";

const tasks = [
  {
    id: "t1",
    title: "Clean Hall A – Morning",
    location: "Hall A",
    priority: "High",
    status: "Pending",
  },
  {
    id: "t2",
    title: "Security Check – Gate 2",
    location: "Gate 2",
    priority: "Medium",
    status: "In Progress",
  },
  {
    id: "t3",
    title: "Fabrication Fix – Stall B12",
    location: "Stall B12",
    priority: "Low",
    status: "Completed",
  },
];

export default function TasksPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">My Tasks</h2>

      {tasks.map((task) => (
        <div
          key={task.id}
          onClick={() => navigate(`/field/tasks/${task.id}`)}
          className="bg-white p-4 rounded-xl shadow-sm border cursor-pointer hover:bg-gray-50"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-medium">{task.title}</h3>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                task.status === "Completed"
                  ? "bg-green-100 text-green-700"
                  : task.status === "In Progress"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {task.status}
            </span>
          </div>

          <div className="mt-2 text-sm text-gray-600 flex justify-between">
            <span>📍 {task.location}</span>
            <span>⚡ {task.priority}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
