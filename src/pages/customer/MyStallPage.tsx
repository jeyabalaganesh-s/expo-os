// src/pages/customer/MyStallPage.tsx

export default function MyStallPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">My Stall</h1>
        <p className="text-sm text-gray-500">
          View your assigned stall details and location inside the hall.
        </p>
      </div>

      {/* Stall info */}
      <div className="bg-white border rounded p-4 max-w-3xl">
        <h2 className="font-semibold mb-3">Stall Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <Field label="Stall ID" value="A12" />
          <Field label="Hall Name" value="Main Exhibition Hall" />
          <Field label="Stall Size" value="3m × 3m" />
          <Field label="Stall Type" value="Standard Exhibitor Stall" />
          <Field label="Entry Gate" value="Gate 2" />
          <Field label="Power Supply" value="Available" />
        </div>
      </div>

      {/* Map preview */}
      <div className="bg-white border rounded p-4">
        <h2 className="font-semibold mb-3">Hall Map</h2>

        <div className="border rounded bg-gray-50 h-[300px] flex items-center justify-center">
          {/* Later replace with real SVG/map image */}
          <div className="text-sm text-gray-400">
            Hall map preview (read-only)
          </div>
        </div>

        <div className="mt-2 text-xs text-gray-500">
          This map is for reference only. Final layout may vary slightly onsite.
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-orange-50 border border-orange-200 rounded p-4 max-w-3xl">
        <h3 className="font-semibold mb-2 text-orange-700">
          Setup Instructions
        </h3>
        <ul className="text-sm text-orange-700 space-y-1 list-disc pl-4">
          <li>Setup allowed from 10 Feb 2025, 10:00 AM</li>
          <li>Please carry your QR pass for entry</li>
          <li>Extra tables or chairs are chargeable</li>
        </ul>
      </div>
    </div>
  );
}

/* -----------------------
   Field Component
----------------------- */

function Field({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="font-medium">{value || "—"}</div>
    </div>
  );
}
