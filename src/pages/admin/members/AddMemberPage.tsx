// src/pages/members/AddMemberPage.tsx
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../../utils/api";

export default function AddMemberPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    address: "",
    notes: "",
    status: "active",

    membership: {
      planName: "",
      status: "active",
      startDate: "",
      endDate: "",
    },
  });

  /* ================= HANDLERS ================= */
  const updateField = (key: string, value: any) => {
    setForm({ ...form, [key]: value });
  };

  const updateMembership = (key: string, value: any) => {
    setForm({
      ...form,
      membership: { ...form.membership, [key]: value },
    });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.mobile || !form.membership.planName) {
      alert("Please fill required fields");
      return;
    }

    try {
      setLoading(true);

      await api.post("/members/", form);

      navigate("/members/all");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to create member");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/members/all"
            className="p-2 rounded-md border hover:bg-gray-50"
          >
            <ArrowLeft size={16} />
          </Link>

          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Add Member
            </h1>
            <p className="text-sm text-gray-500">
              Create a new Expo OS member
            </p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-orange-600 text-white px-5 py-2 rounded-md text-sm hover:bg-orange-700 disabled:opacity-60"
        >
          Save Member
        </button>
      </div>

      {/* ================= FORM ================= */}
      <div className="bg-white border rounded-xl p-6 space-y-8">
        {/* ===== BASIC DETAILS ===== */}
        <section>
          <h2 className="text-lg font-semibold mb-4">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Full Name *"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="border rounded-md px-3 py-2 text-sm"
            />

            <input
              placeholder="Email Address *"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="border rounded-md px-3 py-2 text-sm"
            />

            <input
              placeholder="Mobile Number *"
              value={form.mobile}
              onChange={(e) => updateField("mobile", e.target.value)}
              className="border rounded-md px-3 py-2 text-sm"
            />

            <input
              placeholder="City"
              value={form.city}
              onChange={(e) => updateField("city", e.target.value)}
              className="border rounded-md px-3 py-2 text-sm"
            />
          </div>
        </section>

        {/* ===== MEMBERSHIP ===== */}
        <section>
          <h2 className="text-lg font-semibold mb-4">
            Membership Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={form.membership.planName}
              onChange={(e) =>
                updateMembership("planName", e.target.value)
              }
              className="border rounded-md px-3 py-2 text-sm"
            >
              <option value="">Select Membership Plan *</option>
              <option>Starter</option>
              <option>Growth</option>
              <option>Elite</option>
            </select>

            <select
              value={form.status}
              onChange={(e) => updateField("status", e.target.value)}
              className="border rounded-md px-3 py-2 text-sm"
            >
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="blocked">Blocked</option>
            </select>

            <input
              type="date"
              value={form.membership.startDate}
              onChange={(e) =>
                updateMembership("startDate", e.target.value)
              }
              className="border rounded-md px-3 py-2 text-sm"
            />

            <input
              type="date"
              value={form.membership.endDate}
              onChange={(e) =>
                updateMembership("endDate", e.target.value)
              }
              className="border rounded-md px-3 py-2 text-sm"
            />
          </div>
        </section>

        {/* ===== ADDRESS ===== */}
        <section>
          <h2 className="text-lg font-semibold mb-4">
            Address Information
          </h2>

          <textarea
            rows={3}
            value={form.address}
            onChange={(e) => updateField("address", e.target.value)}
            placeholder="Full Address"
            className="border rounded-md px-3 py-2 text-sm w-full"
          />
        </section>

        {/* ===== NOTES ===== */}
        <section>
          <h2 className="text-lg font-semibold mb-4">
            Internal Notes
          </h2>

          <textarea
            rows={4}
            value={form.notes}
            onChange={(e) => updateField("notes", e.target.value)}
            placeholder="Notes for admin reference (optional)"
            className="border rounded-md px-3 py-2 text-sm w-full"
          />
        </section>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="flex justify-end gap-3">
        <Link
          to="/members/all"
          className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50"
        >
          Cancel
        </Link>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-5 py-2 text-sm bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-60"
        >
          Create Member
        </button>
      </div>
    </div>
  );
}
