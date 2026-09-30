export default function CreativeDashboardPage() {
  const stats = [
    { title: "Assigned Tasks", value: 8 },
    { title: "Pending Approvals", value: 3 },
    { title: "Completed", value: 12 },
    { title: "Due Today", value: 2 },
  ];

  const todaysTasks = [
    {
      title: "FoodPreneur Standee Design",
      type: "Design",
      deadline: "Today, 5:00 PM",
      status: "In Progress",
    },
    {
      title: "Sponsor Backdrop Printing",
      type: "Flex",
      deadline: "Today, 7:00 PM",
      status: "Pending",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">My Work</h1>
        <p className="text-sm text-gray-500 mt-1">
          Overview of your assigned creative & production work
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Stat key={s.title} title={s.title} value={s.value} />
        ))}
      </div>

      {/* Today's Priority */}
      <div className="bg-white border rounded-lg p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium">Today’s Priority</h2>
          <span className="text-xs text-gray-500">Focus first</span>
        </div>

        {todaysTasks.length > 0 ? (
          <div className="space-y-3">
            {todaysTasks.map((t, i) => (
              <div
                key={i}
                className="border rounded-md p-3 hover:bg-gray-50 transition"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{t.title}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {t.type} • {t.deadline}
                    </p>
                  </div>
                  <StatusBadge status={t.status} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No urgent tasks today 🎉
          </p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <QuickAction
          title="View All Tasks"
          description="See all assigned work"
        />
        <QuickAction
          title="Upload New Work"
          description="Submit files for approval"
        />
      </div>
    </div>
  );
}

/* -----------------------
   Helpers
------------------------*/

function Stat({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white border rounded-lg p-4">
      <p className="text-xs text-gray-500">{title}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}

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

function QuickAction({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white border rounded-lg p-4 hover:shadow-sm transition cursor-pointer">
      <p className="font-medium">{title}</p>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </div>
  );
}
