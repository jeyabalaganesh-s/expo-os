import {
  FiClock,
  FiMapPin,
  FiPlayCircle,
  FiCheckCircle,
} from "react-icons/fi";

export default function SchedulePage() {
  const sessions = [
    {
      time: "10:00 – 11:00",
      hall: "Conference Hall A",
      title: "Future of FoodTech",
      status: "Upcoming",
    },
    {
      time: "11:30 – 12:30",
      hall: "Seminar Room B",
      title: "Packaging Innovations",
      status: "Ongoing",
    },
    {
      time: "02:00 – 03:00",
      hall: "Conference Hall A",
      title: "Sustainable Manufacturing",
      status: "Completed",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Conference Schedule</h1>
        <p className="text-sm text-gray-500 mt-1">
          Day-wise session timeline and hall allocation
        </p>
      </div>

      {/* Schedule List */}
      <div className="space-y-3">
        {sessions.map((s, i) => (
          <div
            key={i}
            className="bg-white border rounded-lg p-4 hover:shadow-sm transition"
          >
            <div className="flex justify-between items-start">

              {/* Left */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FiClock />
                  <span>{s.time}</span>
                </div>

                <h3 className="font-medium text-base">{s.title}</h3>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FiMapPin />
                  <span>{s.hall}</span>
                </div>
              </div>

              {/* Right */}
              <StatusBadge status={s.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -----------------------
   Helpers
------------------------*/

function StatusBadge({ status }: { status: string }) {
  if (status === "Upcoming") {
    return (
      <span className="inline-flex items-center gap-1 text-blue-700 bg-blue-100 px-2 py-1 rounded-full text-xs">
        <FiClock />
        Upcoming
      </span>
    );
  }

  if (status === "Ongoing") {
    return (
      <span className="inline-flex items-center gap-1 text-green-700 bg-green-100 px-2 py-1 rounded-full text-xs">
        <FiPlayCircle />
        Ongoing
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-gray-700 bg-gray-100 px-2 py-1 rounded-full text-xs">
      <FiCheckCircle />
      Completed
    </span>
  );
}
