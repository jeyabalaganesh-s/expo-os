// src/pages/members/Community.tsx
import { Search, MapPin, Briefcase } from "lucide-react";
import { useState } from "react";

const members = [
  {
    id: 1,
    name: "Arun Kumar",
    role: "Founder",
    brand: "SpiceCraft Foods",
    city: "Chennai",
    category: "Spices",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 2,
    name: "Meena Raj",
    role: "Co-Founder",
    brand: "GreenBite",
    city: "Coimbatore",
    category: "Healthy Snacks",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: 3,
    name: "Suresh",
    role: "Owner",
    brand: "Daily Dairy",
    city: "Madurai",
    category: "Dairy",
    avatar: "https://i.pravatar.cc/150?img=45",
  },
];

export default function Community() {
  const [search, setSearch] = useState("");

  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Community
        </h2>
        <p className="text-gray-500 mt-1">
          Connect with fellow SUKA Circle members
        </p>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="bg-white rounded-xl p-4 flex items-center gap-3">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or brand..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none text-sm"
        />
      </div>

      {/* ================= MEMBERS ================= */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

/* ================= COMPONENTS ================= */

function MemberCard({ member }: { member: any }) {
  return (
    <div className="bg-white rounded-xl p-5 hover:shadow-md transition">
      <div className="flex items-center gap-4">
        <img
          src={member.avatar}
          alt={member.name}
          className="w-14 h-14 rounded-full"
        />
        <div>
          <h3 className="font-semibold text-gray-800">
            {member.name}
          </h3>
          <p className="text-sm text-gray-500">
            {member.role} · {member.brand}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
        <span className="flex items-center gap-1">
          <MapPin size={14} /> {member.city}
        </span>
        <span className="flex items-center gap-1">
          <Briefcase size={14} /> {member.category}
        </span>
      </div>

      <button className="mt-4 w-full px-4 py-2 rounded-lg border text-sm text-gray-700 hover:bg-gray-50">
        View Profile
      </button>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-white rounded-xl p-10 text-center text-gray-500">
      No members found.
    </div>
  );
}
