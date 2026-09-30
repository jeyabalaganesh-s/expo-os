import { useEffect, useState } from "react";
import PageShell from "../../../components/workspace/PageShell";
import api from "../../../utils/api";
import {
  Users,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

/* ================= TYPES ================= */

type RegistrationConfig = {
  registrationEnabled: boolean;
  approvalRequired: boolean;
  maxRegistrations: number;
  waitlistEnabled: boolean;
  waitlistLimit: number;
  confirmationEmailEnabled: boolean;
  reminderEmailEnabled: boolean;
};

type RegistrationStats = {
  totalRegistered: number;
  approved: number;
  pending: number;
  rejected: number;
};

/* ================= COMPONENT ================= */

export default function Registration() {
  const [config, setConfig] =
    useState<RegistrationConfig>({
      registrationEnabled: true,
      approvalRequired: false,
      maxRegistrations: 0,
      waitlistEnabled: false,
      waitlistLimit: 0,
      confirmationEmailEnabled: true,
      reminderEmailEnabled: true,
    });

  const [stats, setStats] = useState<RegistrationStats>({
    totalRegistered: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  const [loading, setLoading] = useState(true);
  const url = window.location.href;
  const base = url.split("/workspace")[0];
  const slug = base.split("//")[1].split(".")[0];

  // later this comes from event context
  const eventPhase: "PRE" | "ONGOING" | "POST" = "POST";

  /* ================= FETCH ================= */

  useEffect(() => {
    fetchRegistration();
    fetchStats();
  }, []);

  const fetchRegistration = async () => {
    try {
      const res = await api.get(
        `/events/${slug}/registration/config`
      );
      setConfig(res.data);
    } catch {
      // defaults are fine
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await api.get(
        `/events/${slug}/registration/stats`
      );
      setStats(res.data);
    } catch {
      // ignore
    }
  };

  /* ================= HELPERS ================= */

  const updateConfig = (
    key: keyof RegistrationConfig,
    value: any
  ) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };



  /* ================= UI ================= */

  return (
    <PageShell
      title="Registration"
      description="Control event registrations, approvals, limits, and communication"
    >
      {loading ? (
        <div className="text-sm text-gray-500">
          Loading registration settings...
        </div>
      ) : (
        <div className="space-y-6 max-w-5xl">
          {/* ================= STATS ================= */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard
              icon={<Users size={18} />}
              label="Total"
              value={stats.totalRegistered}
            />
            <StatCard
              icon={<CheckCircle size={18} />}
              label="Approved"
              value={stats.approved}
              color="green"
            />
            <StatCard
              icon={<Clock size={18} />}
              label="Pending"
              value={stats.pending}
              color="yellow"
            />
            <StatCard
              icon={<XCircle size={18} />}
              label="Rejected"
              value={stats.rejected}
              color="red"
            />
          </div>

          {/* ================= REGISTRATION CONTROL ================= */}
          <div className="bg-white border rounded-xl p-4 space-y-4">
            <h3 className="text-sm font-semibold">
              Registration Control
            </h3>

            <Toggle
              label="Enable registrations"
              value={config.registrationEnabled}
              onChange={(v) =>
                updateConfig("registrationEnabled", v)
              }
            />

            <Toggle
              label="Require manual approval"
              value={config.approvalRequired}
              onChange={(v) =>
                updateConfig("approvalRequired", v)
              }
            />

            <div>
              <label className="text-sm font-medium">
                Max Registrations (0 = unlimited)
              </label>
              <input
                type="number"
                className="w-full border rounded px-3 py-2 text-sm"
                value={config.maxRegistrations}
                onChange={(e) =>
                  updateConfig(
                    "maxRegistrations",
                    Number(e.target.value)
                  )
                }
              />
            </div>
          </div>

          {/* ================= WAITLIST ================= */}
          <div className="bg-white border rounded-xl p-4 space-y-4">
            <h3 className="text-sm font-semibold">
              Waitlist
            </h3>

            <Toggle
              label="Enable waitlist"
              value={config.waitlistEnabled}
              onChange={(v) =>
                updateConfig("waitlistEnabled", v)
              }
            />

            {config.waitlistEnabled && (
              <div>
                <label className="text-sm font-medium">
                  Waitlist Limit
                </label>
                <input
                  type="number"
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={config.waitlistLimit}
                  onChange={(e) =>
                    updateConfig(
                      "waitlistLimit",
                      Number(e.target.value)
                    )
                  }
                />
              </div>
            )}
          </div>

          {/* ================= EMAIL AUTOMATION ================= */}
          <div className="bg-white border rounded-xl p-4 space-y-4">
            <h3 className="text-sm font-semibold">
              Communication
            </h3>

            <Toggle
              label="Send confirmation email"
              value={config.confirmationEmailEnabled}
              onChange={(v) =>
                updateConfig(
                  "confirmationEmailEnabled",
                  v
                )
              }
            />

            <Toggle
              label="Send reminder emails"
              value={config.reminderEmailEnabled}
              onChange={(v) =>
                updateConfig("reminderEmailEnabled", v)
              }
            />
          </div>

          {/* ================= POST EVENT NOTE ================= */}
          {eventPhase === "POST" && (
            <div className="bg-white border rounded-xl p-4">
              <p className="text-sm text-gray-500">
                Registrations are closed after the event.
              </p>
            </div>
          )}
        </div>
      )}
    </PageShell>
  );
}

/* ================= SMALL COMPONENTS ================= */

function Toggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 text-sm">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </label>
  );
}

function StatCard({
  icon,
  label,
  value,
  color = "gray",
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color?: "gray" | "green" | "yellow" | "red";
}) {
  const colorMap: Record<string, string> = {
    gray: "bg-gray-100 text-gray-700",
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white border rounded-xl p-4 flex items-center gap-3">
      <div
        className={`p-2 rounded ${colorMap[color]}`}
      >
        {icon}
      </div>
      <div>
        <div className="text-xs text-gray-500">
          {label}
        </div>
        <div className="text-lg font-semibold">
          {value}
        </div>
      </div>
    </div>
  );
}
