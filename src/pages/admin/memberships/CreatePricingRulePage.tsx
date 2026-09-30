import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../utils/api";

type Plan = {
  _id: string;
  name: string;
};

export default function CreatePricingRulePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);

  const [form, setForm] = useState({
    name: "",
    plan: "",
    discountType: "Percentage",
    discountValue: "",
    validFrom: "",
    validTo: "",
    conditions: ["New members only"],
    status: "Active",
  });

  /* ================= FETCH PLANS ================= */
  useEffect(() => {
    api.get("/memberships/plans").then((res) => setPlans(res.data));
  }, []);

  /* ================= HANDLERS ================= */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addCondition = () => {
    setForm({ ...form, conditions: [...form.conditions, ""] });
  };

  const updateCondition = (index: number, value: string) => {
    const updated = [...form.conditions];
    updated[index] = value;
    setForm({ ...form, conditions: updated });
  };

  const removeCondition = (index: number) => {
    setForm({
      ...form,
      conditions: form.conditions.filter((_, i) => i !== index),
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    try {
      setLoading(true);

      await api.post("/memberships/pricing", {
        ...form,
        discountValue: Number(form.discountValue),
        conditions: form.conditions.filter(Boolean),
      });

      navigate("/memberships/pricing");
    } catch {
      alert("Failed to create pricing rule");
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
            to="/memberships/pricing"
            className="p-2 border rounded-md hover:bg-gray-50"
          >
            <ArrowLeft size={16} />
          </Link>

          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Create Pricing Rule
            </h1>
            <p className="text-sm text-gray-500">
              Configure discounts, validity, and conditions
            </p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700 flex items-center gap-2 disabled:opacity-60"
        >
          <Save size={14} />
          {loading ? "Saving..." : "Save Rule"}
        </button>
      </div>

      {/* ================= FORM ================= */}
      <div className="bg-white border rounded-xl p-6 space-y-8">
        {/* ===== BASIC DETAILS ===== */}
        <Section title="Basic Details">
          <Input
            label="Rule Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="New Year Offer"
          />

          <Select
            label="Membership Plan"
            name="plan"
            value={form.plan}
            onChange={handleChange}
          >
            <option value="">Select plan</option>
            {plans.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </Select>

          <Select
            label="Discount Type"
            name="discountType"
            value={form.discountType}
            onChange={handleChange}
          >
            <option value="Percentage">Percentage</option>
            <option value="Flat">Flat</option>
          </Select>

          <Input
            label="Discount Value"
            name="discountValue"
            type="number"
            value={form.discountValue}
            onChange={handleChange}
            placeholder="20"
          />
        </Section>

        {/* ===== VALIDITY ===== */}
        <Section title="Validity Period">
          <Input
            label="Valid From"
            name="validFrom"
            type="date"
            value={form.validFrom}
            onChange={handleChange}
          />
          <Input
            label="Valid To"
            name="validTo"
            type="date"
            value={form.validTo}
            onChange={handleChange}
          />
        </Section>

        {/* ===== CONDITIONS ===== */}
        <Section title="Conditions">
          <div className="space-y-3 col-span-2">
            {form.conditions.map((c: string, i: number) => (
              <ConditionInput
              key={i}
              value={c}
              onChange={(v: string) => updateCondition(i, v)}
              onRemove={() => removeCondition(i)}
              />
            ))}

            <button
              onClick={addCondition}
              className="flex items-center gap-2 text-sm text-orange-600 hover:underline"
            >
              <Plus size={14} />
              Add Condition
            </button>
          </div>
        </Section>

        {/* ===== STATUS ===== */}
        <Section title="Status">
          <Select
            label="Rule Status"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </Select>
        </Section>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="flex justify-end gap-3">
        <Link
          to="/memberships/pricing"
          className="px-4 py-2 border rounded-md text-sm hover:bg-gray-50"
        >
          Cancel
        </Link>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-5 py-2 bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700 disabled:opacity-60"
        >
          Create Rule
        </button>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Section({ title, children }: any) {
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

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="text-xs text-gray-500">{label}</label>
      <input
        {...props}
        className="w-full border rounded-md px-3 py-2 text-sm"
      />
    </div>
  );
}

function Select({ label, children, ...props }: any) {
  return (
    <div>
      <label className="text-xs text-gray-500">{label}</label>
      <select
        {...props}
        className="w-full border rounded-md px-3 py-2 text-sm"
      >
        {children}
      </select>
    </div>
  );
}

function ConditionInput({
  value,
  onChange,
  onRemove,
}: any) {
  return (
    <div className="flex items-center gap-2">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Condition description"
        className="flex-1 border rounded-md px-3 py-2 text-sm"
      />
      <button
        onClick={onRemove}
        className="p-2 text-gray-400 hover:text-red-600"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
