import { ArrowLeft, Save, ShieldAlert } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../utils/api";

/* ================= TYPES ================= */

type MemberStatus = "Active" | "Expired" | "Blocked";

type BlockReason =
  | ""
  | "Payment Dispute"
  | "Policy Violation"
  | "Fraud Suspected"
  | "Manual Admin Block";

type MemberForm = {
  name: string;
  email: string;
  mobile: string;
  city: string;

  membershipPlan: string;
  status: MemberStatus;
  joinedOn: string;
  expiresOn: string;

  blockReason: BlockReason;
  notes: string;
};

/* ================= COMPONENT ================= */

export default function MemberEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<MemberForm | null>(null);

  /* ================= FETCH MEMBER ================= */

  const fetchMember = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/members/${id}`);

      const m = res.data.data;

      setForm({
        name: m.name,
        email: m.email,
        mobile: m.mobile,
        city: m.city,

        membershipPlan: m.membership,
        status: m.status,
        joinedOn: m.joinedOn?.slice(0, 10),
        expiresOn: m.expiresOn?.slice(0, 10),

        blockReason: m.blockReason || "",
        notes: m.notes || "",
      });
    } catch (err) {
      alert("Failed to load member");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchMember();
  }, [id]);

  /* ================= UPDATE ================= */

  const handleSave = async () => {
    if (!form) return;

    try {
      setSaving(true);

      await api.put(`/members/${id}`, {
        ...form,
      });

      navigate(`/admin/members/${id}`);
    } catch {
      alert("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  /* ================= BLOCK / UNBLOCK ================= */

  const toggleBlock = async () => {
    if (!form) return;

    if (form.status === "Blocked") {
      await api.patch(`/members/${id}/unblock`);
      setForm({ ...form, status: "Active", blockReason: "" });
    } else {
      if (!form.blockReason) {
        alert("Select block reason first");
        return;
      }
      await api.patch(`/members/${id}/block`, {
        reason: form.blockReason,
      });
      setForm({ ...form, status: "Blocked" });
    }
  };

  /* ================= RENDER ================= */

  if (loading || !form) {
    return <div className="p-6 text-sm text-gray-500">Loading member...</div>;
  }

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link
            to={`/admin/members/${id}`}
            className="p-2 border rounded-md hover:bg-gray-50"
          >
            <ArrowLeft size={16} />
          </Link>

          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Edit Member
            </h1>
            <p className="text-sm text-gray-500">
              Member ID: {id}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 text-sm bg-orange-600 text-white rounded-md hover:bg-orange-700 flex items-center gap-2 disabled:opacity-50"
          >
            <Save size={14} />
            Save Changes
          </button>
        </div>
      </div>

      {/* ================= FORM ================= */}
      <div className="bg-white border rounded-xl p-6 space-y-8">
        {/* ===== BASIC INFO ===== */}
        <Section title="Basic Information">
          <Input
            label="Full Name"
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
          />
          <Input
            label="Email Address"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
          />
          <Input
            label="Mobile Number"
            value={form.mobile}
            onChange={(v) => setForm({ ...form, mobile: v })}
          />
          <Input
            label="City"
            value={form.city}
            onChange={(v) => setForm({ ...form, city: v })}
          />
        </Section>

        {/* ===== MEMBERSHIP ===== */}
        <Section title="Membership Details">
          <Select
            label="Membership Plan"
            value={form.membershipPlan}
            onChange={(v) =>
              setForm({ ...form, membershipPlan: v })
            }
          >
            <option>Annual</option>
            <option>Monthly</option>
          </Select>

          <Select
            label="Status"
            value={form.status}
            onChange={(v) =>
              setForm({ ...form, status: v as MemberStatus })
            }
          >
            <option>Active</option>
            <option>Expired</option>
            <option>Blocked</option>
          </Select>

          <Input
            label="Joined On"
            type="date"
            value={form.joinedOn}
            onChange={(v) =>
              setForm({ ...form, joinedOn: v })
            }
          />
          <Input
            label="Expires On"
            type="date"
            value={form.expiresOn}
            onChange={(v) =>
              setForm({ ...form, expiresOn: v })
            }
          />
        </Section>

        {/* ===== SECURITY ===== */}
        <Section title="Security & Access">
          <Select
            label="Block Reason"
            value={form.blockReason}
            onChange={(v) =>
              setForm({ ...form, blockReason: v as BlockReason })
            }
          >
            <option value="">None</option>
            <option>Payment Dispute</option>
            <option>Policy Violation</option>
            <option>Fraud Suspected</option>
            <option>Manual Admin Block</option>
          </Select>

          <button
            onClick={toggleBlock}
            className="flex items-center gap-2 text-sm text-red-600"
          >
            <ShieldAlert size={14} />
            {form.status === "Blocked"
              ? "Unblock Member"
              : "Block Member"}
          </button>
        </Section>

        {/* ===== NOTES ===== */}
        <Section title="Internal Notes">
          <textarea
            rows={4}
            value={form.notes}
            onChange={(e) =>
              setForm({ ...form, notes: e.target.value })
            }
            className="border rounded-md px-3 py-2 text-sm w-full"
          />
        </Section>
      </div>
    </div>
  );
}

/* ================= UI HELPERS ================= */

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
  type = "text",
  value,
  onChange,
}: {
  label: string;
  type?: string;
  value?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-xs text-gray-500">{label}</label>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-md px-3 py-2 text-sm"
      />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-xs text-gray-500">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-md px-3 py-2 text-sm"
      >
        {children}
      </select>
    </div>
  );
}
