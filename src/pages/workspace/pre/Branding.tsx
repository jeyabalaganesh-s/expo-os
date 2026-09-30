import { useState } from "react";
import PageShell from "../../../components/workspace/PageShell";
import {
  Upload,
  ImageIcon,
  Palette,
  Type,
  CheckCircle,
} from "lucide-react";

/* ================= COMPONENT ================= */

export default function Branding() {
  const [logo, setLogo] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);

  const [primaryColor, setPrimaryColor] =
    useState("#f97316"); // orange
  const [secondaryColor, setSecondaryColor] =
    useState("#0f172a"); // dark

  const [font, setFont] = useState("Inter");

  const [applyLanding, setApplyLanding] =
    useState(true);
  const [applyEmails, setApplyEmails] =
    useState(true);
  const [applyCertificates, setApplyCertificates] =
    useState(false);

  /* ================= UI ================= */

  return (
    <PageShell
      title="Branding & Theme"
      description="Customize event branding across landing pages, emails, and certificates"
    >
      <div className="space-y-8">
        {/* ================= LOGO & COVER ================= */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700">
            Logo & Cover
          </h3>

          <div className="grid grid-cols-2 gap-6">
            {/* LOGO */}
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <ImageIcon size={16} />
                Event Logo
              </div>

              <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg h-32 cursor-pointer hover:bg-gray-50">
                <Upload size={20} className="text-gray-400" />
                <span className="text-xs text-gray-500 mt-1">
                  Upload logo
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) =>
                    setLogo(e.target.files?.[0] || null)
                  }
                />
              </label>

              {logo && (
                <div className="text-xs text-green-600 flex items-center gap-1">
                  <CheckCircle size={12} />
                  {logo.name}
                </div>
              )}
            </div>

            {/* COVER */}
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <ImageIcon size={16} />
                Cover Image
              </div>

              <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg h-32 cursor-pointer hover:bg-gray-50">
                <Upload size={20} className="text-gray-400" />
                <span className="text-xs text-gray-500 mt-1">
                  Upload cover
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) =>
                    setCover(e.target.files?.[0] || null)
                  }
                />
              </label>

              {cover && (
                <div className="text-xs text-green-600 flex items-center gap-1">
                  <CheckCircle size={12} />
                  {cover.name}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ================= COLORS ================= */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700">
            Color Theme
          </h3>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center gap-3 border rounded-lg p-4">
              <Palette size={18} />
              <div className="flex-1">
                <div className="text-sm font-medium">
                  Primary Color
                </div>
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) =>
                    setPrimaryColor(e.target.value)
                  }
                  className="mt-2 w-20 h-8 border rounded"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 border rounded-lg p-4">
              <Palette size={18} />
              <div className="flex-1">
                <div className="text-sm font-medium">
                  Secondary Color
                </div>
                <input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) =>
                    setSecondaryColor(e.target.value)
                  }
                  className="mt-2 w-20 h-8 border rounded"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= FONT ================= */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700">
            Typography
          </h3>

          <div className="border rounded-lg p-4 flex items-center gap-4">
            <Type size={18} />
            <select
              value={font}
              onChange={(e) => setFont(e.target.value)}
              className="border rounded px-3 py-2 text-sm"
            >
              <option value="Inter">Inter</option>
              <option value="Poppins">Poppins</option>
              <option value="Roboto">Roboto</option>
              <option value="Montserrat">
                Montserrat
              </option>
            </select>
          </div>
        </section>

        {/* ================= APPLY TO ================= */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700">
            Apply Branding To
          </h3>

          <div className="grid grid-cols-3 gap-4">
            <label className="flex items-center gap-2 border rounded-lg p-3 cursor-pointer">
              <input
                type="checkbox"
                checked={applyLanding}
                onChange={() =>
                  setApplyLanding(!applyLanding)
                }
              />
              <span className="text-sm">
                Landing Page
              </span>
            </label>

            <label className="flex items-center gap-2 border rounded-lg p-3 cursor-pointer">
              <input
                type="checkbox"
                checked={applyEmails}
                onChange={() =>
                  setApplyEmails(!applyEmails)
                }
              />
              <span className="text-sm">
                Email Templates
              </span>
            </label>

            <label className="flex items-center gap-2 border rounded-lg p-3 cursor-pointer">
              <input
                type="checkbox"
                checked={applyCertificates}
                onChange={() =>
                  setApplyCertificates(!applyCertificates)
                }
              />
              <span className="text-sm">
                Certificates
              </span>
            </label>
          </div>
        </section>

        {/* ================= SAVE ================= */}
        <div className="flex justify-end">
          <button className="px-5 py-2 bg-orange-600 text-white rounded-md text-sm hover:bg-orange-700">
            Save Branding
          </button>
        </div>
      </div>
    </PageShell>
  );
}
