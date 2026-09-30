// src/pages/members/Settings.tsx
import {
  Bell,
  Eye,
  Lock,
  Save,
  LogOut,
} from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [eventNotif, setEventNotif] = useState(true);
  const [showProfile, setShowProfile] = useState(true);

  return (
    <div className="max-w-4xl space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Settings
        </h2>
        <p className="text-gray-500 mt-1">
          Manage your preferences and account
        </p>
      </div>

      {/* ================= PROFILE PREF ================= */}
      <Section
        icon={Eye}
        title="Profile Preferences"
        description="Control how your profile appears in the community"
      >
        <Toggle
          label="Show my profile in community directory"
          value={showProfile}
          onChange={setShowProfile}
        />
      </Section>

      {/* ================= NOTIFICATIONS ================= */}
      <Section
        icon={Bell}
        title="Notifications"
        description="Choose what notifications you want to receive"
      >
        <Toggle
          label="Email notifications"
          value={emailNotif}
          onChange={setEmailNotif}
        />
        <Toggle
          label="Event reminders"
          value={eventNotif}
          onChange={setEventNotif}
        />
      </Section>

      {/* ================= SECURITY ================= */}
      <Section
        icon={Lock}
        title="Account Security"
        description="Manage your login and security settings"
      >
        <button className="text-sm text-orange-600 font-medium">
          Change Password
        </button>
      </Section>

      {/* ================= ACTIONS ================= */}
      <div className="bg-white rounded-xl p-6 flex flex-col sm:flex-row justify-between gap-4">
        <button className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-orange-600 text-white text-sm hover:bg-orange-700">
          <Save size={16} /> Save Changes
        </button>

        <button className="inline-flex items-center gap-2 px-5 py-2 rounded-lg border text-sm text-red-600 hover:bg-red-50">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );
}

/* ================= REUSABLE ================= */

function Section({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: any;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl p-6 space-y-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
          <Icon size={20} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {title}
          </h3>
          <p className="text-sm text-gray-500">
            {description}
          </p>
        </div>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

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
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-700">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
          value ? "bg-orange-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`w-4 h-4 bg-white rounded-full transition transform ${
            value ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
  );
}
