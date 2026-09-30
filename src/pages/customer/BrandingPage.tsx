// src/pages/customer/BrandingPage.tsx
export default function BrandingPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-2xl font-semibold">Branding Materials</h1>

      <div className="bg-white border rounded p-4 space-y-4">
        <Upload label="Company Logo" hint="PNG / JPG • Max 2MB" />
        <Upload label="Stall Banner" hint="Recommended: 3m × 1m" />

        <div>
          <label className="text-sm text-gray-500">Brand Notes</label>
          <textarea
            rows={4}
            className="w-full border rounded p-2 text-sm"
            placeholder="Any special instructions for branding team…"
          />
        </div>

        <button className="px-4 py-2 bg-orange-500 text-white rounded">
          Save Branding
        </button>
      </div>
    </div>
  );
}

function Upload({ label, hint }: any) {
  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>
      <div className="border-dashed border-2 rounded p-4 text-center text-sm text-gray-400">
        Click to upload
      </div>
      <div className="text-xs text-gray-400 mt-1">{hint}</div>
    </div>
  );
}
