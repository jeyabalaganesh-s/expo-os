import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExpoHallMap from "../../components/CusExpoHallMap";

/* ===============================
   Types
================================ */
type Stall = {
  id: string;
  width: number;
  height: number;
  price: number;
  status: "available" | "booked";
};

const STALLS: Stall[] = [
  { id: "A1", width: 3, height: 3, price: 15000, status: "available" },
  { id: "A2", width: 3, height: 3, price: 15000, status: "booked" },
  { id: "B1", width: 6, height: 3, price: 28000, status: "available" },
  { id: "B2", width: 6, height: 3, price: 28000, status: "available" },
];

const HALL_CONFIG = {
  hall: {
    name: "Main Expo Hall",
    width: 40,
    height: 30,
    grid_unit: 1,
  },
  stalls: STALLS.map((s, i) => ({
    id: s.id,
    x: 6 + i * 8,
    y: 8,
    width: s.width,
    height: s.height,
    status: s.status,
    price: s.price,
  })),
  areas: [],
};

export default function BookStallPage() {
  const navigate = useNavigate();

  const [selectedStall, setSelectedStall] = useState<Stall | null>(null);
  const [businessName, setBusinessName] = useState("");
  const [gst, setGst] = useState("");
  const [category, setCategory] = useState("");

  const canProceed =
    !!selectedStall && businessName.trim().length > 2;

  function onMapSelect(item: any) {
    if (item?.type === "stall") {
      const stall = STALLS.find((s) => s.id === item.id);
      if (stall?.status === "available") {
        setSelectedStall(stall);
      }
    }
  }

  function proceed() {
    if (!canProceed) return;

    navigate("/customer/booking/summary", {
      state: {
        stall: selectedStall,
        businessName,
        gst,
        category,
      },
    });
  }

  const areaSqm =
    selectedStall &&
    selectedStall.width * selectedStall.height;

  const ratePerSqm =
    selectedStall && Math.round(selectedStall.price / areaSqm!);

  return (
    <div className="max-w-7xl mx-auto p-4 pb-28 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">
          Book Your Stall
        </h1>
        <p className="text-sm text-gray-500">
          Select a stall and enter your business details
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1 */}
          <section className="bg-white border rounded-xl p-4 space-y-3">
            <h2 className="font-medium text-gray-900">
              Step 1: Select Stall
            </h2>

            <div className="h-[360px] border rounded-lg bg-gray-50">
              <ExpoHallMap
                config={HALL_CONFIG}
                tool="select"
                onSelect={onMapSelect}
              />
            </div>

            <div className="flex gap-4 text-xs text-gray-500">
              <span>Available</span>
              <span>Booked</span>
              <span>Tap a stall to select</span>
            </div>
          </section>

          {/* Step 2 */}
          <section className="bg-white border rounded-xl p-4 space-y-4">
            <h2 className="font-medium text-gray-900">
              Step 2: Business Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500">
                  Business / Brand Name *
                </label>
                <input
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                  placeholder="Eg: SpiceHub Pvt Ltd"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500">
                  Product Category
                </label>
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                  placeholder="Eg: Spices / Bakery / FMCG"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500">
                  GST Number (optional)
                </label>
                <input
                  value={gst}
                  onChange={(e) => setGst(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                  placeholder="22AAAAA0000A1Z5"
                />
              </div>
            </div>
          </section>
        </div>

        {/* DESKTOP SUMMARY */}
        <aside className="hidden lg:block bg-white border rounded-xl p-4 h-fit sticky top-6">
          <h3 className="font-medium mb-3">Booking Summary</h3>

          {!selectedStall && (
            <div className="text-sm text-gray-500">
              Select a stall to view pricing.
            </div>
          )}

          {selectedStall && (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Stall</span>
                <strong>{selectedStall.id}</strong>
              </div>

              <div className="flex justify-between">
                <span>Size</span>
                <span>
                  {selectedStall.width}m × {selectedStall.height}m
                </span>
              </div>

              <div className="flex justify-between">
                <span>Area</span>
                <span>{areaSqm} sqm</span>
              </div>

              <div className="flex justify-between">
                <span>Rate</span>
                <span>₹ {ratePerSqm}/sqm</span>
              </div>

              <div className="border-t pt-2 flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>
                  ₹ {selectedStall.price.toLocaleString()}
                </span>
              </div>

              <div className="text-xs text-gray-400">
                * Taxes & add-ons calculated later
              </div>
            </div>
          )}

          <button
            disabled={!canProceed}
            onClick={proceed}
            className={`w-full mt-4 py-2 rounded-lg text-white ${
              canProceed
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Review & Continue →
          </button>
        </aside>
      </div>

      {/* MOBILE BOTTOM CTA */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t p-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">
            {selectedStall
              ? `Stall ${selectedStall.id}`
              : "No stall selected"}
          </span>
          <strong>
            ₹{" "}
            {selectedStall
              ? selectedStall.price.toLocaleString()
              : "--"}
          </strong>
        </div>

        <button
          disabled={!canProceed}
          onClick={proceed}
          className={`w-full py-2 rounded-lg text-white ${
            canProceed
              ? "bg-orange-500 hover:bg-orange-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
