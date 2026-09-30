// src/pages/customer/SponsorDashboard.tsx
export default function SponsorDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Sponsor Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <Card label="Sponsorship Tier" value="Gold Sponsor" />
        <Card label="Branding Zones" value="5 Locations" />
        <Card label="QR Access" value="VIP Entry" />
      </div>

      <div className="bg-white border rounded p-4">
        <h3 className="font-semibold mb-2">Deliverables</h3>
        <ul className="text-sm space-y-1">
          <li>✔ Stage branding</li>
          <li>✔ Website logo</li>
          <li>⬜ Backdrop banner upload</li>
        </ul>
      </div>
    </div>
  );
}

function Card({ label, value }: any) {
  return (
    <div className="bg-white border rounded p-4">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
}
