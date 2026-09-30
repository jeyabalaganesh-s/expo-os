import { useEffect, useState } from "react";
import PageShell from "../../../components/workspace/PageShell";
import api from "../../../utils/api";
import { Plus, Trash2 } from "lucide-react";

/* ================= TYPES ================= */

type PricingTier = {
  _id?: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  saleStart?: string;
  saleEnd?: string;
  isActive: boolean;
};

type PricingConfig = {
  isFreeEvent: boolean;
  tiers: PricingTier[];
};



/* ================= COMPONENT ================= */

export default function Pricing() {
  const [config, setConfig] = useState<PricingConfig>({
    isFreeEvent: true,
    tiers: [],
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);



  /* ================= SLUG ================= */

  const url = window.location.href;
  const base = url.split("/workspace")[0];
  const slug = base.split("//")[1].split(".")[0];

  /* ================= FETCH ================= */

  useEffect(() => {
    fetchPricing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPricing = async () => {
    try {
      const res = await api.get(
        `/events/${slug}/pricing`
      );
      setConfig(res.data);
    } catch {
      setConfig({
        isFreeEvent: true,
        tiers: [],
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================= HELPERS ================= */

  const updateConfig = (
    key: keyof PricingConfig,
    value: any
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const addTier = () => {
  setConfig((prev) => ({
    ...prev,
    tiers: [
      ...prev.tiers,
      {
        _id: `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}`,
        name: "",
        price: 0,
        currency: "INR",
        quantity: 0,
        isActive: true,
      },
    ],
  }));
};


  const updateTier = (
    id: string | undefined,
    key: keyof PricingTier,
    value: any
  ) => {
    setConfig((prev) => ({
      ...prev,
      tiers: prev.tiers.map((t) =>
        t._id === id ? { ...t, [key]: value } : t
      ),
    }));
  };

  const removeTier = (id?: string) => {
    if (!id) return;
    setConfig((prev) => ({
      ...prev,
      tiers: prev.tiers.filter((t) => t._id !== id),
    }));
  };

  const savePricing = async () => {
    try {
      setSaving(true);
      await api.put(`/events/${slug}/pricing`, config);
    } finally {
      setSaving(false);
    }
  };

  /* ================= UI ================= */

  return (
    <PageShell
      title="Pricing"
      description="Define pricing tiers and availability for this event"
    >
      {loading ? (
        <div className="text-sm text-gray-500">
          Loading pricing…
        </div>
      ) : (
        <div className="space-y-6 max-w-5xl">
          {/* ================= FREE / PAID ================= */}
          <div className="bg-white border rounded-xl p-4">
            <label className="flex items-center gap-3 text-sm font-medium">
              <input
                type="checkbox"
                checked={config.isFreeEvent}
                onChange={(e) =>
                  updateConfig(
                    "isFreeEvent",
                    e.target.checked
                  )
                }
              />
              This is a free event
            </label>
          </div>

          {/* ================= PRICING TIERS ================= */}
          {!config.isFreeEvent && (
            <div className="bg-white border rounded-xl p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold">
                  Pricing Tiers
                </h3>
                <button
                  onClick={addTier}
                  className="text-sm text-orange-600 flex items-center gap-1 disabled:opacity-50"
                >
                  <Plus size={14} />
                  Add Tier
                </button>
              </div>

              {config.tiers.map((tier) => (
  <div
    key={tier._id}
    className="border rounded-lg p-4 space-y-4 bg-gray-50"
  >
    {/* Tier Header */}
    <div className="flex justify-between items-center">
      <h4 className="text-sm font-semibold text-gray-700">
        Pricing Tier
      </h4>

      <button
        onClick={() => removeTier(tier._id)}
        className="text-red-600 hover:text-red-800"
      >
        <Trash2 size={16} />
      </button>
    </div>

    {/* Tier Name */}
    <div>
      <label className="text-xs text-gray-500">
        Tier Name
      </label>
      <input
        className="w-full border rounded px-3 py-2 text-sm"
        value={tier.name}
        onChange={(e) =>
          updateTier(tier._id, "name", e.target.value)
        }
        placeholder="Early Bird"
      />
    </div>

    {/* Price / Quantity / Currency */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="text-xs text-gray-500">
          Price
        </label>
        <input
          type="number"
          className="w-full border rounded px-3 py-2 text-sm"
          value={tier.price}
          onChange={(e) =>
            updateTier(
              tier._id,
              "price",
              Number(e.target.value)
            )
          }
        />
      </div>

      <div>
        <label className="text-xs text-gray-500">
          Quantity
        </label>
        <input
          type="number"
          className="w-full border rounded px-3 py-2 text-sm"
          value={tier.quantity}
          onChange={(e) =>
            updateTier(
              tier._id,
              "quantity",
              Number(e.target.value)
            )
          }
        />
      </div>

      <div>
        <label className="text-xs text-gray-500">
          Currency
        </label>
        <select
          className="w-full border rounded px-3 py-2 text-sm"
          value={tier.currency}
          onChange={(e) =>
            updateTier(
              tier._id,
              "currency",
              e.target.value
            )
          }
        >
          <option value="INR">INR</option>
          <option value="USD">USD</option>
        </select>
      </div>
    </div>

    {/* Active Toggle */}
    <label className="flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        checked={tier.isActive}
        onChange={(e) =>
          updateTier(
            tier._id,
            "isActive",
            e.target.checked
          )
        }
      />
      Tier is active
    </label>
  </div>
))}

            </div>
          )}
          {/* ================= SAVE ================= */}
          <div className="flex justify-end">
            <button
              onClick={savePricing}
              className="bg-orange-600 text-white px-6 py-2 rounded-md text-sm hover:bg-orange-700 disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save Pricing"}
            </button>
          </div>
        </div>
      )}
    </PageShell>
  );
}
