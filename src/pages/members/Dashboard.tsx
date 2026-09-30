// src/pages/members/Dashboard.tsx
import {
  Calendar,
  Users,
  BookOpen,
  Crown,
  ArrowRight,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* ================= WELCOME ================= */}
      <div className="bg-white rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Welcome back, Bala 👋
          </h2>
          <p className="text-gray-500 mt-1">
            You’re part of the SUKA Circle community
          </p>
        </div>

        <span className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-600 text-sm font-medium">
          <Crown size={16} />
          Active Member
        </span>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Calendar}
          label="Events Attended"
          value="3"
        />
        <StatCard
          icon={Users}
          label="Connections"
          value="24"
        />
        <StatCard
          icon={BookOpen}
          label="Resources Accessed"
          value="12"
        />
        <StatCard
          icon={Crown}
          label="Membership Valid Till"
          value="Dec 2026"
        />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Events */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Upcoming Events
          </h3>

          <EventItem
            title="How I Built My Food Brand"
            date="31 Jan 2026 • 6:00 PM"
          />
          <EventItem
            title="Food Branding AMA Session"
            date="5 Feb 2026 • 7:00 PM"
          />

          <button className="mt-4 inline-flex items-center gap-2 text-orange-600 text-sm font-medium">
            View all events <ArrowRight size={16} />
          </button>
        </div>

        {/* Announcements */}
        <div className="bg-white rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Announcements
          </h3>

          <ul className="space-y-3 text-sm text-gray-600">
            <li>🎉 New members-only webinar added</li>
            <li>📚 3 new resources uploaded</li>
            <li>🔥 February networking meet announced</li>
          </ul>
        </div>
      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Quick Actions
        </h3>

        <div className="flex flex-wrap gap-3">
          <ActionButton label="View Profile" />
          <ActionButton label="Browse Events" />
          <ActionButton label="Access Resources" />
          <ActionButton label="Renew Membership" />
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white rounded-xl p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-lg font-semibold text-gray-800">
          {value}
        </p>
      </div>
    </div>
  );
}

function EventItem({
  title,
  date,
}: {
  title: string;
  date: string;
}) {
  return (
    <div className="flex justify-between items-center py-3 border-b last:border-none">
      <div>
        <p className="font-medium text-gray-800">{title}</p>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
      <button className="text-orange-600 text-sm font-medium">
        Join
      </button>
    </div>
  );
}

function ActionButton({ label }: { label: string }) {
  return (
    <button className="px-4 py-2 rounded-lg bg-orange-50 text-orange-600 text-sm font-medium hover:bg-orange-100">
      {label}
    </button>
  );
}
