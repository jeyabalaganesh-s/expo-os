import { useEffect, useState } from "react";
import PageShell from "../../../components/workspace/PageShell";
import api from "../../../utils/api";
import {

  Trash2,
  Image as ImageIcon,
  Video,
  FileText,
} from "lucide-react";

/* ================= TYPES ================= */

type MediaType = "image" | "video" | "document";

type MediaItem = {
  _id: string;
  name: string;
  url: string;
  type: MediaType;
  size: number;
  visibility: "Public" | "Internal";
  createdAt: string;
};

/* ================= COMPONENT ================= */

export default function Media() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
 
  /* ================= FETCH ================= */

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await api.get("/events/current/media");
      setMedia(res.data || []);
    } catch {
      setMedia([]);
    } finally {
      setLoading(false);
    }
  };

  

  /* ================= DELETE ================= */

  const deleteMedia = async (id: string) => {
    if (!confirm("Delete this media file?")) return;

    try {
      await api.delete(`/events/current/media/${id}`);
      fetchMedia();
    } catch {
      alert("Failed to delete media");
    }
  };

  /* ================= ICON ================= */

  const getIcon = (type: MediaType) => {
    switch (type) {
      case "image":
        return <ImageIcon size={16} />;
      case "video":
        return <Video size={16} />;
      default:
        return <FileText size={16} />;
    }
  };

  /* ================= UI ================= */

  return (
    <PageShell
      title="Media Library"
      description="Manage images, videos, and documents for your event"
    >
      {loading ? (
        <div className="text-sm text-gray-500">
          Loading media...
        </div>
      ) : media.length === 0 ? (
        <div className="text-sm text-gray-500">
          No media uploaded yet
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {media.map((item) => (
            <div
              key={item._id}
              className="bg-white border rounded-lg p-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  {getIcon(item.type)}
                  <span className="truncate">
                    {item.name}
                  </span>
                </div>

                <div className="text-xs text-gray-500">
                  {(item.size / 1024 / 1024).toFixed(2)} MB
                </div>

                <div className="text-xs">
                  <span
                    className={`px-2 py-1 rounded-full ${
                      item.visibility === "Public"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.visibility}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <a
                  href={item.url}
                  target="_blank"
                  className="text-sm text-blue-600 hover:underline"
                >
                  View
                </a>

                <button
                  onClick={() => deleteMedia(item._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageShell>
  );
}
