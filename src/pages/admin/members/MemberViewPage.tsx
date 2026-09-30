// src/pages/members/MemberViewPage.tsx
import { ArrowLeft, Edit, ShieldAlert } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../utils/api";

type Member = {
  memberId: string;
  name: string;
  email: string;
  mobile: string;
  city: string;
  status: "active" | "expired" | "blocked";
  joinedOn: string;
  membership: {
    plan: string;
    status: string;
    startDate: string;
    endDate: string;
    daysLeft: number;
  };
  notes: string;
};

export default function MemberViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  useEffect(() => {
    const loadMember = async () => {
      try {
        const res = await api.get(`/members/${id}`);
        setMember(res.data.data);
      } catch {
        navigate("/admin/members/all");
      } finally {
        setLoading(false);
      }
    };

    loadMember();
  }, [id]);

  /* ================= BLOCK ================= */
  const handleBlock = async () => {
    if (!member) return;

    await api.patch(`/api/members/${member.memberId}/block`);
    setMember({ ...member, status: "blocked" });
  };

  if (loading) {
    return <div className="text-gray-500">Loading member...</div>;
  }

  if (!member) return null;

  /* ================= UI ================= */
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/members/all"
            className="p-2 border rounded-md hover:bg-gray-50"
          >
            <ArrowLeft size={16} />
          </Link>

          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Member Profile
            </h1>
            <p className="text-sm text-gray-500">
              Member ID: {member.memberId}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            to={`/admin/members/${member.memberId}/edit`}
            className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50 flex items-center gap-2"
          >
            <Edit size={14} /> Edit
          </Link>

          {member.status !== "blocked" && (
            <button
              onClick={handleBlock}
              className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2"
            >
              <ShieldAlert size={14} />
              Block Member
            </button>
          )}
        </div>
      </div>

      {/* SUMMARY */}
      <div className="bg-white border rounded-xl p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Info
          label="Status"
          value={member.status.toUpperCase()}
          badge={
            member.status === "active"
              ? "bg-green-100 text-green-700"
              : member.status === "expired"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }
        />
        <Info label="Membership" value={member.membership.plan} />
        <Info label="City" value={member.city || "-"} />
        <Info
          label="Joined On"
          value={new Date(member.joinedOn).toLocaleDateString()}
        />
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Section title="Personal Information">
            <Field label="Full Name" value={member.name} />
            <Field label="Email" value={member.email} />
            <Field label="Mobile" value={member.mobile} />
            <Field label="City" value={member.city || "-"} />
          </Section>

          <Section title="Membership Details">
            <Field label="Plan" value={member.membership.plan} />
            <Field label="Status" value={member.membership.status} />
            <Field
              label="Expires On"
              value={new Date(
                member.membership.endDate
              ).toLocaleDateString()}
            />
            <Field
              label="Days Left"
              value={`${member.membership.daysLeft} days`}
            />
          </Section>

          <Section title="Internal Notes">
            <p className="text-sm text-gray-600">
              {member.notes || "—"}
            </p>
          </Section>
        </div>

        <div className="space-y-6">
          <div className="bg-white border rounded-xl p-4 space-y-3">
            <h3 className="font-semibold">Quick Actions</h3>
            <button className="w-full px-4 py-2 text-sm border rounded-md">
              Send Email
            </button>
            <button className="w-full px-4 py-2 text-sm border rounded-md">
              Send WhatsApp
            </button>
            <button className="w-full px-4 py-2 text-sm border rounded-md">
              Renew Membership
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= HELPERS ================= */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border rounded-xl p-6 space-y-4">
      <h2 className="font-semibold">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}

function Info({
  label,
  value,
  badge,
}: {
  label: string;
  value: string;
  badge?: string;
}) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p
        className={`text-sm font-semibold ${
          badge ? `inline-block px-2 py-1 rounded-full ${badge}` : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}
