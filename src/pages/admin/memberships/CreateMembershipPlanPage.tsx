import { ArrowLeft, Plus, Trash2, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../../utils/api";

export default function CreateMembershipPlanPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    validityMonths: "",
    status: "Active",
    benefits: ["Free online webinars"],
  });

  /* ================= HANDLERS ================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBenefitChange = (index: number, value: string) => {
    const updated = [...form.benefits];
    updated[index] = value;
    setForm({ ...form, benefits: updated });
  };

  const addBenefit = () => {
    setForm({ ...form, benefits: [...form.benefits, ""] });
  };

  const removeBenefit = (index: number) => {
    setForm({
      ...form,
      benefits: form.benefits.filter((_, i) => i !== index),
    });
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await api.post("/memberships/plans", {
        name: form.name,
        price: Number(form.price),
        validityMonths: Number(form.validityMonths),
        status: form.status,
        benefits: form.benefits.filter(Boolean),
      });

      navigate("/memberships/plans");
    } catch (err) {
      alert("Failed to create membership plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link
            to="/memberships/plans"
            className="p-2 border rounded-md hover:bg-gray-50"
          >
            <ArrowLeft size={16} />
          </Link>

          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Create Membership Plan
            </h1>
            <p className="text-sm text-gray-500">
              Define pricing, validity, and benefits
            </p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700 flex items-center gap-2 disabled:opacity-60"
        >
          <Save size={14} />
          {loading ? "Saving..." : "Save Plan"}
        </button>
      </div>

      {/* ================= FORM ================= */}
      <div className="bg-white border rounded-xl p-6 space-y-8">
        {/* ===== BASIC INFO ===== */}
        <Section title="Basic Details">
          <Input
            label="Plan Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Annual Membership"
          />

          <Input
            label="Price (₹)"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="3000"
          />

          <Input
            label="Validity (Months)"
            name="validityMonths"
            type="number"
            value={form.validityMonths}
            onChange={handleChange}
            placeholder="12"
          />

          <Select
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </Select>
        </Section>

        {/* ===== BENEFITS ===== */}
        <Section title="Plan Benefits">
          <div className="space-y-3 col-span-2">
            {form.benefits.map((benefit, i) => (
              <BenefitInput
                key={i}
                value={benefit}
                onChange={(v) => handleBenefitChange(i, v)}
                onRemove={() => removeBenefit(i)}
              />
            ))}

            <button
              onClick={addBenefit}
              className="flex items-center gap-2 text-sm text-orange-600 hover:underline"
            >
              <Plus size={14} />
              Add Benefit
            </button>
          </div>
        </Section>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="flex justify-end gap-3">
        <Link
          to="/memberships/plans"
          className="px-4 py-2 border rounded-md text-sm hover:bg-gray-50"
        >
          Cancel
        </Link>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-5 py-2 bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700 disabled:opacity-60"
        >
          Create Plan
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
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}: any) {
  return (
    <div>
      <label className="text-xs text-gray-500">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className="w-full border rounded-md px-3 py-2 text-sm"
      />
    </div>
  );
}

function Select({
  label,
  name,
  value,
  onChange,
  children,
}: any) {
  return (
    <div>
      <label className="text-xs text-gray-500">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-md px-3 py-2 text-sm"
      >
        {children}
      </select>
    </div>
  );
}

function BenefitInput({
  value,
  onChange,
  onRemove,
}: {
  value: string;
  onChange: (v: string) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Benefit description"
        className="flex-1 border rounded-md px-3 py-2 text-sm"
      />
      <button
        onClick={onRemove}
        title="Remove"
        className="p-2 text-gray-400 hover:text-red-600"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
