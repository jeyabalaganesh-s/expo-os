import { useEffect, useState } from "react";
import {
  Plus,
  Clock,
  User,
} from "lucide-react";

/* ================= TYPES ================= */

type TaskStatus = "pending" | "in_progress" | "done";

type Task = {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
  status: TaskStatus;
  createdAt: string;
};

/* ================= COMPONENT ================= */

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");

  /* ================= INIT ================= */

  useEffect(() => {
    const saved = localStorage.getItem("event_tasks");
    setTasks(saved ? JSON.parse(saved) : []);
  }, []);

  /* ================= PERSIST ================= */

  useEffect(() => {
    localStorage.setItem(
      "event_tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  /* ================= ACTIONS ================= */

  const addTask = () => {
    if (!title.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      title,
      assignee,
      dueDate,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [task, ...prev]);
    setTitle("");
    setAssignee("");
    setDueDate("");
  };

  const updateStatus = (id: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status } : t
      )
    );
  };

  /* ================= UI ================= */

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Tasks
        </h1>
        <p className="text-sm text-gray-500">
          Manage event operation tasks
        </p>
      </div>

      {/* ADD TASK */}
      <div className="bg-white border rounded-xl p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="border rounded-md px-3 py-2 text-sm"
          />

          <input
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            placeholder="Assign to"
            className="border rounded-md px-3 py-2 text-sm"
          />

          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(e.target.value)
            }
            className="border rounded-md px-3 py-2 text-sm"
          />
        </div>

        <button
          onClick={addTask}
          className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-700"
        >
          <Plus size={16} />
          Add Task
        </button>
      </div>

      {/* TASK LIST */}
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-sm text-gray-400">
            No tasks created yet
          </div>
        ) : (
          tasks.map((t) => (
            <div
              key={t.id}
              className="bg-white border rounded-xl p-4 flex justify-between items-center gap-4"
            >
              <div>
                <div className="font-medium text-gray-900">
                  {t.title}
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                  {t.assignee && (
                    <span className="flex items-center gap-1">
                      <User size={12} />
                      {t.assignee}
                    </span>
                  )}

                  {t.dueDate && (
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {t.dueDate}
                    </span>
                  )}
                </div>
              </div>

              {/* STATUS */}
              <div className="flex gap-2">
                {t.status !== "in_progress" && (
                  <button
                    onClick={() =>
                      updateStatus(t.id, "in_progress")
                    }
                    className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Start
                  </button>
                )}

                {t.status !== "done" && (
                  <button
                    onClick={() =>
                      updateStatus(t.id, "done")
                    }
                    className="px-3 py-1.5 text-xs bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Done
                  </button>
                )}

                <StatusBadge status={t.status} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ================= STATUS BADGE ================= */

function StatusBadge({
  status,
}: {
  status: TaskStatus;
}) {
  const map = {
    pending: "bg-gray-100 text-gray-600",
    in_progress: "bg-blue-100 text-blue-700",
    done: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${map[status]}`}
    >
      {status.replace("_", " ").toUpperCase()}
    </span>
  );
}
