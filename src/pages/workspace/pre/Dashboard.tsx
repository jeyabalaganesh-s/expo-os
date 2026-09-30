import PageShell from "../../../components/workspace/PageShell";
import {
  Users,
  IndianRupee,
  CalendarDays,
  CheckCircle,
  XCircle,
  Mail,
  Ticket,
  Megaphone,
  Eye,
} from "lucide-react";

/* ================= COMPONENT ================= */

export default function PreEventDashboard() {
  const daysLeft = 18;

  const setupChecklist = [
    { label: "Branding completed", done: true },
    { label: "Agenda published", done: true },
    { label: "Speakers added", done: false },
    { label: "Tickets & pricing", done: true },
    { label: "Payment gateway", done: true },
    { label: "Email campaigns", done: false },
  ];

  return (
    <PageShell
      title="Pre-Event Dashboard"
      description="Track readiness, registrations, and marketing before launch"
    >
      {/* ================= METRICS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Registrations"
          value="324"
          icon={<Users size={18} />}
        />
        <StatCard
          title="Paid Tickets"
          value="210"
          icon={<Ticket size={18} />}
        />
        <StatCard
          title="Revenue"
          value="₹4,20,000"
          icon={<IndianRupee size={18} />}
        />
        <StatCard
          title="Days Left"
          value={`${daysLeft} days`}
          icon={<CalendarDays size={18} />}
        />
      </div>

      {/* ================= CONTENT GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* ===== SETUP CHECKLIST ===== */}
        <div className="bg-white border rounded-xl p-4">
          <h3 className="font-semibold text-sm mb-3">
            Event Setup Checklist
          </h3>

          <ul className="space-y-3">
            {setupChecklist.map((item, i) => (
              <li
                key={i}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-gray-700">
                  {item.label}
                </span>
                {item.done ? (
                  <CheckCircle
                    size={16}
                    className="text-green-600"
                  />
                ) : (
                  <XCircle
                    size={16}
                    className="text-red-500"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* ===== MARKETING OVERVIEW ===== */}
        <div className="bg-white border rounded-xl p-4">
          <h3 className="font-semibold text-sm mb-3">
            Marketing Performance
          </h3>

          <div className="space-y-4 text-sm">
            <MetricRow label="Email campaigns" value="3 active" />
            <MetricRow label="Coupon usage" value="64 uses" />
            <MetricRow label="Conversion rate" value="6.2%" />
            <MetricRow label="Landing page visits" value="5,430" />
          </div>
        </div>

        {/* ===== QUICK ACTIONS ===== */}
        <div className="bg-white border rounded-xl p-4">
          <h3 className="font-semibold text-sm mb-3">
            Quick Actions
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <ActionButton
              label="Edit Landing"
              icon={<Eye size={14} />}
            />
            <ActionButton
              label="Create Campaign"
              icon={<Mail size={14} />}
            />
            <ActionButton
              label="Manage Tickets"
              icon={<Ticket size={14} />}
            />
            <ActionButton
              label="Promote Event"
              icon={<Megaphone size={14} />}
            />
          </div>
        </div>
      </div>
    </PageShell>
  );
}

/* ================= SUB COMPONENTS ================= */

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white border rounded-xl p-4 flex items-center justify-between">
      <div>
        <p className="text-xs text-gray-500">
          {title}
        </p>
        <p className="text-xl font-semibold text-gray-900">
          {value}
        </p>
      </div>
      <div className="text-orange-600">
        {icon}
      </div>
    </div>
  );
}

function MetricRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">
        {label}
      </span>
      <span className="font-medium text-gray-900">
        {value}
      </span>
    </div>
  );
}

function ActionButton({
  label,
  icon,
}: {
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <button className="flex items-center gap-2 px-3 py-2 border rounded-md text-sm hover:bg-orange-50 hover:text-orange-700">
      {icon}
      {label}
    </button>
  );
}
