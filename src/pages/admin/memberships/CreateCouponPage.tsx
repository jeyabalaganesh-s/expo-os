import { ArrowLeft, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../utils/api";

type Offer = {
  _id: string;
  name: string;
};

export default function CreateCouponPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState<Offer[]>([]);

  const [form, setForm] = useState({
    code: "",
    offer: "",
    status: "Active",
    usageLimit: "",
    perUserLimit: "1",
    validFrom: "",
    validTo: "",
    notes: "",
  });

  /* ================= FETCH OFFERS ================= */
  useEffect(() => {
    api.get("/memberships/offers").then((res) => setOffers(res.data));
  }, []);

  /* ================= HANDLERS ================= */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload: any = {
        code: form.code.toUpperCase(),
        status: form.status,
        usageLimit: Number(form.usageLimit),
        perUserLimit: Number(form.perUserLimit),
        validFrom: form.validFrom,
        validTo: form.validTo,
        notes: form.notes,
      };

      // optional offer link
      if (form.offer) {
        payload.offer = form.offer;
      }

      await api.post("/memberships/coupons", payload);

      navigate("/memberships/coupons");
    } catch {
      alert("Failed to create coupon");
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
            to="/memberships/coupons"
            className="p-2 border rounded-md hover:bg-gray-50"
          >
            <ArrowLeft size={16} />
          </Link>

          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Create Coupon
            </h1>
            <p className="text-sm text-gray-500">
              Generate coupon codes for offers & pricing rules
            </p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700 flex items-center gap-2 disabled:opacity-60"
        >
          <Save size={14} />
          {loading ? "Saving..." : "Save Coupon"}
        </button>
      </div>

      {/* ================= FORM ================= */}
      <div className="bg-white border rounded-xl p-6 space-y-8">
        {/* ===== BASIC ===== */}
        <Section title="Coupon Details">
          <Input
            label="Coupon Code"
            name="code"
            value={form.code}
            onChange={handleChange}
            placeholder="NEWYEAR20"
          />

          <Select
            label="Linked Offer (Optional)"
            name="offer"
            value={form.offer}
            onChange={handleChange}
          >
            <option value="">No offer</option>
            {offers.map((o) => (
              <option key={o._id} value={o._id}>
                {o.name}
              </option>
            ))}
          </Select>

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

        {/* ===== USAGE ===== */}
        <Section title="Usage Rules">
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

        {/* ===== VALIDITY ===== */}
        <Section title="Validity">
          <Input
            label="Valid From"
            name="validFrom"
            type="date"
            value={form.validFrom}
            onChange={handleChange}
          />
          <Input
            label="Valid Till"
            name="validTo"
            type="date"
            value={form.validTo}
            onChange={handleChange}
          />
        </Section>

        {/* ===== NOTES ===== */}
        <Section title="Internal Notes">
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={4}
            placeholder="Optional admin notes..."
            className="border rounded-md px-3 py-2 text-sm w-full col-span-2"
          />
        </Section>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="flex justify-end gap-3">
        <Link
          to="/memberships/coupons"
          className="px-4 py-2 border rounded-md text-sm hover:bg-gray-50"
        >
          Cancel
        </Link>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-5 py-2 bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700 disabled:opacity-60"
        >
          Create Coupon
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
