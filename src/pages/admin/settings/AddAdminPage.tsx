import { ArrowLeft, Save, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function AddAdminPage() {
  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link
            to="/settings/admin-users"
            className="p-2 border rounded-md hover:bg-gray-50"
          >
            <ArrowLeft size={16} />
          </Link>

          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Add Admin User
            </h1>
            <p className="text-sm text-gray-500">
              Create or invite a new admin user
            </p>
          </div>
        </div>

        <button className="px-4 py-2 bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700 flex items-center gap-2">
          <Save size={14} />
          Save Admin
        </button>
      </div>

      {/* ================= FORM ================= */}
      <div className="bg-white border rounded-xl p-6 space-y-8">
        {/* ===== BASIC INFO ===== */}
        <Section title="Admin Information">
          <Input label="Full Name" placeholder="John Doe" />
          <Input label="Email Address" placeholder="admin@expoos.com" />
          <Input label="Mobile Number" placeholder="9876543210" />
        </Section>

        {/* ===== ROLE ASSIGNMENT ===== */}
        <Section title="Role & Access">
          <Select label="Assign Role">
            <option>Select Role</option>
            <option>Super Admin</option>
            <option>Membership Admin</option>
            <option>Event Admin</option>
            <option>Finance Admin</option>
            <option>Viewer</option>
          </Select>

          <Select label="Account Status">
            <option>Active</option>
            <option>Inactive</option>
          </Select>
        </Section>

        {/* ===== INVITATION SETTINGS ===== */}
        <Section title="Invitation Settings">
          <Select label="Send Invitation Email">
            <option>Yes</option>
            <option>No</option>
          </Select>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail size={14} />
            User will receive an email to set password
          </div>
        </Section>

        {/* ===== NOTES ===== */}
        <Section title="Internal Notes">
          <textarea
            rows={3}
            placeholder="Optional admin notes..."
            className="border rounded-md px-3 py-2 text-sm w-full col-span-2"
          />
        </Section>
      </div>

      {/* ================= FOOTER ACTIONS ================= */}
      <div className="flex justify-end gap-3">
        <Link
          to="/settings/admin-users"
          className="px-4 py-2 border rounded-md text-sm hover:bg-gray-50"
        >
          Cancel
        </Link>
        <button className="px-5 py-2 bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700">
          Add Admin
        </button>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children}
      </div>
    </section>
  );
}

function Input({
  label,
  placeholder,
}: {
  label: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs text-gray-500">{label}</label>
      <input
        placeholder={placeholder}
        className="w-full border rounded-md px-3 py-2 text-sm"
      />
    </div>
  );
}

function Select({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-xs text-gray-500">{label}</label>
      <select className="w-full border rounded-md px-3 py-2 text-sm">
        {children}
      </select>
    </div>
  );
}
