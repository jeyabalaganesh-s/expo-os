import { useEffect, useState } from "react";
import { Video, X } from "lucide-react";

/* ================= TYPES ================= */

type GalleryType = "photo" | "video";

type GalleryItem = {
  id: string;
  type: GalleryType;
  url: string;
  caption?: string;
};

/* ================= MOCK DATA ================= */

const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: "g1",
    type: "photo",
    url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    caption: "Opening ceremony",
  },
  {
    id: "g2",
    type: "photo",
    url: "https://images.unsplash.com/photo-1515165562835-c3b8c2f1c1b8",
    caption: "Audience engagement",
  },
  {
    id: "g3",
    type: "video",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    caption: "Keynote highlight",
  },
];

/* ================= COMPONENT ================= */

export default function WorkspaceGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [filter, setFilter] =
    useState<GalleryType | "all">("all");
  const [preview, setPreview] =
    useState<GalleryItem | null>(null);

  /* ================= INIT ================= */

  useEffect(() => {
    const saved = localStorage.getItem("event_gallery");
    setItems(saved ? JSON.parse(saved) : INITIAL_GALLERY);
  }, []);

  /* ================= FILTER ================= */

  const filteredItems =
    filter === "all"
      ? items
      : items.filter((i) => i.type === filter);

  /* ================= UI ================= */

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Event Gallery
        </h1>
        <p className="text-sm text-gray-500">
          Moments captured from the event
        </p>
      </div>

      {/* FILTER */}
      <div className="flex gap-2">
        <FilterButton
          active={filter === "all"}
          onClick={() => setFilter("all")}
        >
          All
        </FilterButton>
        <FilterButton
          active={filter === "photo"}
          onClick={() => setFilter("photo")}
        >
          Photos
        </FilterButton>
        <FilterButton
          active={filter === "video"}
          onClick={() => setFilter("video")}
        >
          Videos
        </FilterButton>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setPreview(item)}
            className="cursor-pointer bg-white border rounded-xl overflow-hidden hover:shadow-md transition"
          >
            {item.type === "photo" ? (
              <img
                src={item.url}
                alt={item.caption}
                className="h-48 w-full object-cover"
              />
            ) : (
              <div className="h-48 bg-black flex items-center justify-center text-white">
                <Video size={32} />
              </div>
            )}

            {item.caption && (
              <div className="p-2 text-xs text-gray-600">
                {item.caption}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* PREVIEW MODAL */}
      {preview && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl max-w-3xl w-full p-4 relative">
            <button
              onClick={() => setPreview(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X />
            </button>

            {preview.type === "photo" ? (
              <img
                src={preview.url}
                alt={preview.caption}
                className="w-full max-h-[70vh] object-contain"
              />
            ) : (
              <video
                src={preview.url}
                controls
                className="w-full max-h-[70vh]"
              />
            )}

            {preview.caption && (
              <div className="mt-3 text-sm text-gray-600 text-center">
                {preview.caption}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= COMPONENTS ================= */

function FilterButton({
  active,
  onClick,
  children,
}: any) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-md text-sm border ${
        active
          ? "bg-orange-600 text-white border-orange-600"
          : "bg-white text-gray-700 hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
  );
}
