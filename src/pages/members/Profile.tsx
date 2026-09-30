// src/pages/members/Profile.tsx
import {
  MapPin,
  Briefcase,
  Mail,
  Phone,
  Globe,
  Edit,
} from "lucide-react";

export default function Profile() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* ================= HEADER ================= */}
      <div className="bg-white rounded-xl p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
        <img
          src="https://i.pravatar.cc/120"
          alt="profile"
          className="w-28 h-28 rounded-full border"
        />

        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-gray-800">
            Bala
          </h2>
          <p className="text-gray-500">
            Founder · Food Brand Entrepreneur
          </p>

          <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <MapPin size={14} /> Tirunelveli
            </span>
            <span className="flex items-center gap-1">
              <Briefcase size={14} /> Snacks & FMCG
            </span>
          </div>
        </div>

        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-600 text-white text-sm hover:bg-orange-700">
          <Edit size={16} /> Edit Profile
        </button>
      </div>

      {/* ================= ABOUT ================= */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          About Me
        </h3>
        <p className="text-gray-600 leading-relaxed">
          I’m a food entrepreneur building a regional snack brand.
          Passionate about scaling distribution, branding, and
          learning from other founders in the SUKA Circle community.
        </p>
      </div>

      {/* ================= BUSINESS ================= */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Business Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <Info label="Brand Name" value="SUKA Snacks" />
          <Info label="Category" value="Packaged Foods" />
          <Info label="Years in Business" value="2 Years" />
          <Info label="Team Size" value="5–10 People" />
        </div>
      </div>

      {/* ================= CONTACT ================= */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Contact & Online Presence
        </h3>

        <div className="space-y-3 text-sm text-gray-600">
          <Contact icon={Mail} value="bala@sukacircle.com" />
          <Contact icon={Phone} value="+91 9XXXXXXXXX" />
          <Contact icon={Globe} value="www.sukacircle.com" />
        </div>
      </div>
    </div>
  );
}

/* ================= REUSABLE ================= */

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  );
}

function Contact({
  icon: Icon,
  value,
}: {
  icon: any;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={16} />
      <span>{value}</span>
    </div>
  );
}
