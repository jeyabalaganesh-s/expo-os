import { useEffect, useState } from "react";
import PageShell from "../../../components/workspace/PageShell";
import api from "../../../utils/api";
import {
  Globe,
  Image as ImageIcon,
  Link2,
} from "lucide-react";

/* ================= TYPES ================= */

type SEOData = {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  noIndex: boolean;
};

type EventPhase = "PRE" | "ONGOING" | "POST";

/* ================= COMPONENT ================= */

export default function SEO() {
  // TEMP – later from Event Context
  const eventPhase: EventPhase = "PRE";

  const [seo, setSeo] = useState<SEOData>({
    title: "",
    description: "",
    keywords: "",
    canonicalUrl: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    noIndex: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ================= SLUG ================= */

  const url = window.location.href;
  const base = url.split("/workspace")[0];
  const slug = base.split("//")[1].split(".")[0];

  /* ================= LOAD ================= */

  useEffect(() => {
    fetchSEO();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSEO = async () => {
    try {
      const res = await api.get(
        `/events/${slug}/seo`
      );
      setSeo({
        title: "",
        description: "",
        keywords: "",
        canonicalUrl: "",
        ogTitle: "",
        ogDescription: "",
        ogImage: "",
        noIndex: false,
        ...res.data,
      });
    } catch {
      // First time SEO – keep defaults
    } finally {
      setLoading(false);
    }
  };

  /* ================= UPDATE ================= */

  const update = (
    key: keyof SEOData,
    value: any
  ) => {
    setSeo((prev) => ({ ...prev, [key]: value }));
  };

  const saveSEO = async () => {
    try {
      setSaving(true);
      await api.put(`/events/${slug}/seo`, seo);
    } finally {
      setSaving(false);
    }
  };

  /* ================= UI ================= */

  return (
    <PageShell
      title="SEO & Meta Settings"
      description="Control how your event appears on Google and social platforms"
    >
      {loading ? (
        <div className="text-sm text-gray-500">
          Loading SEO settings…
        </div>
      ) : (
        <div className="space-y-6 max-w-4xl">
          {/* ================= BASIC SEO ================= */}
          <section className="bg-white border rounded-xl p-4 space-y-4">
            <h2 className="font-medium flex items-center gap-2">
              <Globe size={16} />
              Search Engine SEO
            </h2>

            <div>
              <label className="text-sm font-medium">
                Page Title
              </label>
              <input
                disabled={eventPhase !== "PRE"}
                value={seo.title}
                onChange={(e) =>
                  update("title", e.target.value)
                }
                className="w-full border rounded px-3 py-2 text-sm"
              />
              <p className="text-xs text-gray-500">
                Recommended: 50–60 characters
              </p>
            </div>

            <div>
              <label className="text-sm font-medium">
                Meta Description
              </label>
              <textarea
                disabled={eventPhase !== "PRE"}
                value={seo.description}
                onChange={(e) =>
                  update(
                    "description",
                    e.target.value
                  )
                }
                rows={3}
                className="w-full border rounded px-3 py-2 text-sm"
              />
              <p className="text-xs text-gray-500">
                Recommended: 150–160 characters
              </p>
            </div>

            <div>
              <label className="text-sm font-medium">
                Keywords
              </label>
              <input
                disabled={eventPhase !== "PRE"}
                value={seo.keywords}
                onChange={(e) =>
                  update("keywords", e.target.value)
                }
                placeholder="comma separated keywords"
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Canonical URL
              </label>
              <div className="flex items-center gap-2">
                <Link2
                  size={14}
                  className="text-gray-400"
                />
                <input
                  disabled={eventPhase !== "PRE"}
                  value={seo.canonicalUrl}
                  onChange={(e) =>
                    update(
                      "canonicalUrl",
                      e.target.value
                    )
                  }
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
            </div>
          </section>

          {/* ================= SOCIAL PREVIEW ================= */}
          <section className="bg-white border rounded-xl p-4 space-y-4">
            <h2 className="font-medium flex items-center gap-2">
              <ImageIcon size={16} />
              Social Preview (Open Graph)
            </h2>

            <div>
              <label className="text-sm font-medium">
                OG Title
              </label>
              <input
                disabled={eventPhase !== "PRE"}
                value={seo.ogTitle}
                onChange={(e) =>
                  update("ogTitle", e.target.value)
                }
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                OG Description
              </label>
              <textarea
                disabled={eventPhase !== "PRE"}
                value={seo.ogDescription}
                onChange={(e) =>
                  update(
                    "ogDescription",
                    e.target.value
                  )
                }
                rows={2}
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                OG Image URL
              </label>
              <input
                disabled={eventPhase !== "PRE"}
                value={seo.ogImage}
                onChange={(e) =>
                  update("ogImage", e.target.value)
                }
                className="w-full border rounded px-3 py-2 text-sm"
              />

              {seo.ogImage && (
                <img
                  src={seo.ogImage}
                  alt="OG Preview"
                  className="mt-3 rounded-md border max-h-40"
                />
              )}
            </div>
          </section>

          {/* ================= INDEXING ================= */}
          <section className="bg-white border rounded-xl p-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                disabled={eventPhase !== "PRE"}
                checked={seo.noIndex}
                onChange={(e) =>
                  update(
                    "noIndex",
                    e.target.checked
                  )
                }
              />
              Prevent search engines from indexing
              this page
            </label>

            <p className="text-xs text-gray-500 mt-1">
              Useful for private or invite-only
              events
            </p>
          </section>

          {/* ================= SAVE ================= */}
          <div className="flex justify-end">
            <button
              onClick={saveSEO}
              disabled={
                eventPhase !== "PRE" || saving
              }
              className="bg-orange-600 text-white px-6 py-2 rounded-md text-sm hover:bg-orange-700 disabled:opacity-50"
            >
              {saving
                ? "Saving…"
                : "Save SEO Settings"}
            </button>
          </div>

          {/* ================= LOCK NOTICE ================= */}
          {eventPhase !== "PRE" && (
            <div className="bg-gray-50 border rounded-xl p-4 text-sm text-gray-500">
              SEO settings are locked once the event
              starts to avoid search engine
              inconsistency.
            </div>
          )}
        </div>
      )}
    </PageShell>
  );
}
