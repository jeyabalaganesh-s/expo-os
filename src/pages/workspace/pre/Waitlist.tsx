import { useEffect, useState } from "react";
import PageShell from "../../../components/workspace/PageShell";
import {
  ArrowUpCircle,
  Trash2,
  Crown,
  Download,
} from "lucide-react";

/* ================= TYPES ================= */

type EventPhase = "PRE" | "ONGOING" | "POST";

type WaitlistStatus = "Waiting" | "Promoted" | "Removed";

type Priority = "VIP" | "Normal";

type WaitlistItem = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  addedAt: string;
  status: WaitlistStatus;
  priority: Priority;
};

/* ================= COMPONENT ================= */

export default function Waitlist() {
  /* ✅ MUST be union, not single literal */
  const eventPhase: EventPhase = "PRE";

  const [items, setItems] = useState<WaitlistItem[]>([]);

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    // Replace with API later
    setItems([
      {
        id: "1",
        name: "Arjun Kumar",
        email: "arjun@gmail.com",
        phone: "9876543210",
        addedAt: "2026-01-12",
        status: "Waiting",
        priority: "VIP",
      },
      {
        id: "2",
        name: "Meena R",
        email: "meena@gmail.com",
        addedAt: "2026-01-13",
        status: "Waiting",
        priority: "Normal",
      },
      {
        id: "3",
        name: "Ravi Shankar",
        email: "ravi@gmail.com",
        addedAt: "2026-01-14",
        status: "Promoted",
        priority: "Normal",
      },
    ]);
  }, []);

  /* ================= ACTIONS ================= */

  const promote = (id: string) => {
    if (!confirm("Promote this user to registered list?"))
      return;

    setItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, status: "Promoted" }
          : i
      )
    );
  };

  const remove = (id: string) => {
    if (!confirm("Remove from waitlist?")) return;

    setItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, status: "Removed" }
          : i
      )
    );
  };

  /* ================= STATS ================= */

  const waitingCount = items.filter(
    (i) => i.status === "Waiting"
  ).length;

  const promotedCount = items.filter(
    (i) => i.status === "Promoted"
  ).length;

  /* ================= UI ================= */

  return (
    <PageShell
      title="Waitlist"
      description="Manage participants waiting for available slots"
      actions={[
        {
          label: "Export",
          onClick: () => alert("Export coming soon"),
          variant: "secondary",
          icon: <Download size={14} />,
        },
      ]}
      meta={
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-xs text-gray-500">
              Waiting
            </div>
            <div className="text-xl font-semibold">
              {waitingCount}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">
              Promoted
            </div>
            <div className="text-xl font-semibold">
              {promotedCount}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">
              Total
            </div>
            <div className="text-xl font-semibold">
              {items.length}
            </div>
          </div>
        </div>
      }
    >
      {/* ================= TABLE ================= */}
      <div className="overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">
                Participant
              </th>
              <th className="p-3 text-left">
                Added On
              </th>
              <th className="p-3 text-left">
                Priority
              </th>
              <th className="p-3 text-left">
                Status
              </th>
              <th className="p-3 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-b last:border-0"
              >
                {/* USER */}
                <td className="p-3">
                  <div className="font-medium">
                    {item.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.email}
                  </div>
                </td>

                {/* DATE */}
                <td className="p-3 text-xs">
                  {item.addedAt}
                </td>

                {/* PRIORITY */}
                <td className="p-3">
                  {item.priority === "VIP" ? (
                    <span className="inline-flex items-center gap-1 text-purple-700 bg-purple-100 px-2 py-1 rounded-full text-xs">
                      <Crown size={12} />
                      VIP
                    </span>
                  ) : (
                    <span className="text-xs text-gray-500">
                      Normal
                    </span>
                  )}
                </td>

                {/* STATUS */}
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      item.status === "Waiting"
                        ? "bg-yellow-100 text-yellow-700"
                        : item.status === "Promoted"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="p-3 text-right">
                  {eventPhase !== "PRE" &&
                    item.status === "Waiting" && (
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() =>
                            promote(item.id)
                          }
                          title="Promote"
                          className="text-green-600 hover:text-green-800"
                        >
                          <ArrowUpCircle size={16} />
                        </button>

                        <button
                          onClick={() =>
                            remove(item.id)
                          }
                          title="Remove"
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                </td>
              </tr>
            ))}

            {items.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="p-6 text-center text-gray-500"
                >
                  No waitlisted users
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= POST EVENT LOCK ================= */}
      {eventPhase === "PRE" && (
        <div className="mt-4 text-sm text-gray-500 bg-gray-50 border rounded-xl p-4">
          Waitlist is locked after event completion
          for records.
        </div>
      )}
    </PageShell>
  );
}
