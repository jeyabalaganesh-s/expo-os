// src/pages/customer/ProfilePage.tsx
export default function ProfilePage() {
  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-semibold">Profile & Settings</h1>

      <div className="bg-white border rounded p-4 space-y-3">
        <Field label="Company Name" value="SpiceHub Pvt Ltd" />
        <Field label="Contact Person" value="Ramesh Kumar" />
        <Field label="Email" value="ramesh@spicehub.com" />
        <Field label="Phone" value="+91 98765 43210" />

        <button className="px-4 py-2 bg-orange-500 text-white rounded">
          Update Profile
        </button>
      </div>
    </div>
  );
}

function Field({ label, value }: any) {
  return (
    <div>
      <label className="text-xs text-gray-500">{label}</label>
      <input
        defaultValue={value}
        className="w-full border rounded px-2 py-1 text-sm"
      />
    </div>
  );
}
