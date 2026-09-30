import {
  FileText,
  Video,
  Link as LinkIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

/* ================= TYPES ================= */

type Resource = {
  _id: string;
  title: string;
  type: "PDF" | "Video" | "Link";
  category: string;
  url?: string; // only for PDF & Link
};

/* ================= PAGE ================= */

export default function Resources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= FETCH ================= */
useEffect(() => {
  const fetchResources = async () => {
    try {
      const res = await api.get("/member/videos/videos");

      const videos = res.data.map((v: any) => ({
        ...v,
        type: "Video",
      }));

      setResources(videos);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Failed to load resources"
      );
    } finally {
      setLoading(false);
    }
  };

  fetchResources();
}, []);


  const categories = [
    "All",
    ...Array.from(new Set(resources.map((r) => r.category))),
  ];

  const filtered =
    activeCategory === "All"
      ? resources
      : resources.filter(
          (r) => r.category === activeCategory
        );

  /* ================= UI ================= */
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Resources
        </h2>
        <p className="text-gray-500 mt-1">
          Curated tools & knowledge for SUKA Circle members
        </p>
      </div>

      {/* Filters */}
      {!loading && resources.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <FilterButton
              key={cat}
              label={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </div>
      )}

      {/* Content */}
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} />
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((resource) => (
            <ResourceCard
              key={resource._id}
              resource={resource}
            />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

/* ================= COMPONENTS ================= */

function ResourceCard({ resource }: { resource: Resource }) {
  const navigate = useNavigate();

  const Icon =
    resource.type === "PDF"
      ? FileText
      : resource.type === "Video"
      ? Video
      : LinkIcon;

  const handleAction = () => {
    if (resource.type === "Video") {
      // ✅ Secure in-app watch
      navigate(`/members/resources/${resource._id}`);
    } else if (resource.url) {
      // ✅ PDF / External link
      window.open(
        resource.url,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  return (
    <div className="bg-white rounded-xl p-5 flex flex-col justify-between hover:shadow-md transition">
      <div>
        <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 mb-3">
          <Icon size={20} />
        </div>

        <h3 className="text-lg font-semibold text-gray-800">
          {resource.title}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          {resource.category}
        </p>
      </div>

      <button
        onClick={handleAction}
        className="mt-5 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-orange-600 text-white text-sm hover:bg-orange-700"
      >
        {resource.type === "Video" ? "Watch" : "Access"}
      </button>
    </div>
  );
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium ${
        active
          ? "bg-orange-600 text-white"
          : "bg-white text-gray-600 hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  );
}

function LoadingState() {
  return (
    <div className="bg-white rounded-xl p-10 text-center text-gray-500">
      Loading resources…
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="bg-red-50 rounded-xl p-6 text-red-600">
      {message}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-white rounded-xl p-10 text-center text-gray-500">
      No resources found.
    </div>
  );
}
