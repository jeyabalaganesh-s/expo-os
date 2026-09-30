import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../utils/api";

type Plan = {
  _id: string;
  name: string;
};

export default function CreateOfferPage() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    offerType: "Membership Discount",
    plan: "",
    applyToAllPlans: false,
    discountType: "Percentage",
    discountValue: "",
    maxDiscount: "",
    startDate: "",
    endDate: "",
    eligibilityRules: ["New members only"],
    usageLimit: "",
    perUserLimit: "1",
    description: "",
    status: "Active",
  });

  /* ================= FETCH PLANS ================= */
  useEffect(() => {
    api.get("/memberships/plans").then((res) => setPlans(res.data));
  }, []);

  /* ================= HANDLERS ================= */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePlanChange = (value: string) => {
    if (value === "ALL") {
      setForm({ ...form, plan: "", applyToAllPlans: true });
    } else {
      setForm({ ...form, plan: value, applyToAllPlans: false });
    }
  };

  const addRule = () => {
    setForm({
      ...form,
      eligibilityRules: [...form.eligibilityRules, ""],
    });
  };

  const updateRule = (index: number, value: string) => {
    const updated = [...form.eligibilityRules];
    updated[index] = value;
    setForm({ ...form, eligibilityRules: updated });
  };

  const removeRule = (index: number) => {
    setForm({
      ...form,
      eligibilityRules: form.eligibilityRules.filter(
        (_, i) => i !== index
      ),
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    try {
      setLoading(true);

      await api.post("/memberships/offers", {
        ...form,
        discountValue: Number(form.discountValue),
        maxDiscount: form.maxDiscount
          ? Number(form.maxDiscount)
          : undefined,
        usageLimit: Number(form.usageLimit),
        perUserLimit: Number(form.perUserLimit),
        eligibilityRules: form.eligibilityRules.filter(Boolean),
      });

      navigate("/memberships/offers");
    } catch {
      alert("Failed to create offer");
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
            to="/memberships/offers"
            className="p-2 border rounded-md hover:bg-gray-50"
          >
            <ArrowLeft size={16} />
          </Link>

          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Create Offer
            </h1>
            <p className="text-sm text-gray-500">
              Limited-time offers for memberships & renewals
            </p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700 flex items-center gap-2 disabled:opacity-60"
        >
          <Save size={14} />
          {loading ? "Saving..." : "Save Offer"}
        </button>
      </div>

      {/* ================= FORM ================= */}
      <div className="bg-white border rounded-xl p-6 space-y-8">
        {/* ===== OFFER DETAILS ===== */}
        <Section title="Offer Details">
          <Input
            label="Offer Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="New Year Special"
          />

          <Select
            label="Offer Type"
            name="offerType"
            value={form.offerType}
            onChange={handleChange}
          >
            <option>Membership Discount</option>
            <option>Renewal Offer</option>
            <option>Event Discount</option>
          </Select>

          <Select
            label="Applicable Plan"
            value={form.applyToAllPlans ? "ALL" : form.plan}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handlePlanChange(e.target.value)}
          >
            <option value="">Select plan</option>
            <option value="ALL">All Plans</option>
            {plans.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </Select>

          <Select
            label="Offer Status"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </Select>
        </Section>

        {/* ===== DISCOUNT ===== */}
        <Section title="Discount Configuration">
          <Select
            label="Discount Type"
            name="discountType"
            value={form.discountType}
            onChange={handleChange}
          >
            <option value="Percentage">Percentage</option>
            <option value="Flat">Flat Amount</option>
          </Select>

          <Input
            label="Discount Value"
            name="discountValue"
            type="number"
            value={form.discountValue}
            onChange={handleChange}
            placeholder="20"
          />

          <Input
            label="Maximum Discount (Optional)"
            name="maxDiscount"
            type="number"
            value={form.maxDiscount}
            onChange={handleChange}
            placeholder="1000"
          />
        </Section>

        {/* ===== VALIDITY ===== */}
        <Section title="Validity Period">
          <Input
            label="Valid From"
            name="startDate"
            type="date"
            value={form.startDate}
            onChange={handleChange}
          />
          <Input
            label="Valid To"
            name="endDate"
            type="date"
            value={form.endDate}
            onChange={handleChange}
          />
        </Section>

        {/* ===== ELIGIBILITY ===== */}
        <Section title="Eligibility Rules">
          <div className="space-y-3 col-span-2">
            {form.eligibilityRules.map((r, i) => (
              <RuleInput
                key={i}
                value={r}
                onChange={(v: string) => updateRule(i, v)}
                onRemove={() => removeRule(i)}
              />
            ))}

            <button
              onClick={addRule}
              className="flex items-center gap-2 text-sm text-orange-600 hover:underline"
            >
              <Plus size={14} />
              Add Rule
            </button>
          </div>
        </Section>

        {/* ===== USAGE LIMITS ===== */}
        <Section title="Usage Limits">
          <Input
            label="Total Usage Limit"
            name="usageLimit"
            type="number"
            value={form.usageLimit}
            onChange={handleChange}
            placeholder="100"
          />
          <Input
            label="Per User Limit"
            name="perUserLimit"
            type="number"
            value={form.perUserLimit}
            onChange={handleChange}
            placeholder="1"
          />
        </Section>

        {/* ===== DESCRIPTION ===== */}
        <Section title="Offer Description">
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Describe the offer details..."
            className="border rounded-md px-3 py-2 text-sm w-full col-span-2"
          />
        </Section>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="flex justify-end gap-3">
        <Link
          to="/memberships/offers"
          className="px-4 py-2 border rounded-md text-sm hover:bg-gray-50"
        >
          Cancel
        </Link>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-5 py-2 bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700 disabled:opacity-60"
        >
          Create Offer
        </button>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Section({ title, children }: any) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>
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

function RuleInput({
  value,
  onChange,
  onRemove,
}: any) {
  return (
    <div className="flex items-center gap-2">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Eligibility rule"
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
