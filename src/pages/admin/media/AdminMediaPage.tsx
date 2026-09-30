import { Edit, ToggleLeft, ToggleRight, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../../../utils/api";

type MediaType = "news" | "video" | "testimonial";
type MediaStatus = "Draft" | "Published";

/* UI filter */
type MediaFilter = MediaType | "all";

type Media = {
  _id: string;
  type: MediaType;
  title: string;
  status: MediaStatus;
  createdAt: string;
};

export default function AdminMediaPage() {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= URL FILTER ================= */
  const [searchParams, setSearchParams] = useSearchParams();
  const rawType = searchParams.get("type");

  const filter: MediaFilter =
    rawType === "news" ||
    rawType === "video" ||
    rawType === "testimonial"
      ? rawType
      : "all";

  /* ================= SEARCH & PAGINATION ================= */
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  /* ================= FETCH MEDIA ================= */
  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await api.get("/media/admin/all");
      setMedia(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch media", err);
      setMedia([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  /* ================= TOGGLE STATUS ================= */
  const toggleStatus = async (id: string) => {
    try {
      await api.patch(`/media/${id}/toggle`);
      setMedia((prev) =>
        prev.map((m) =>
          m._id === id
            ? {
                ...m,
                status:
                  m.status === "Published" ? "Draft" : "Published",
              }
            : m
        )
      );
    } catch {
      alert("Failed to update status");
    }
  };

  /* ================= FILTERED + SEARCHED ================= */
  const filteredMedia = useMemo(() => {
    return media.filter((m) => {
      const matchesType = filter === "all" || m.type === filter;
      const matchesSearch = m.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesType && matchesSearch;
    });
  }, [media, filter, search]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filteredMedia.length / pageSize);

  const paginatedMedia = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredMedia.slice(start, start + pageSize);
  }, [filteredMedia, page, pageSize]);

  /* Reset page when filters change */
  useEffect(() => {
    setPage(1);
  }, [filter, search, pageSize]);

  /* ================= RENDER ================= */

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            News & Media
          </h1>
          <p className="text-sm text-gray-500">
            Manage news, videos, and testimonials
          </p>
        </div>

        <Link
          to="/admin/media/create"
          className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-700"
        >
          + Create Media
        </Link>
      </div>

      {/* ================= FILTER TABS ================= */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-3">
          {[
            { key: "all", label: "All" },
            { key: "news", label: "News" },
            { key: "video", label: "Videos" },
            { key: "testimonial", label: "Testimonials" },
          ].map((f) => {
            const isActive = filter === f.key;

            return (
              <button
                key={f.key}
                onClick={() => {
                  if (f.key === "all") {
                    setSearchParams({});
                  } else {
                    setSearchParams({ type: f.key });
                  }
                }}
                className={`px-4 py-2 text-sm rounded-md border transition ${
                  isActive
                    ? "bg-orange-50 border-orange-300 text-orange-700"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* SEARCH */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search media…"
            className="pl-9 pr-3 py-2 border rounded-md text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white border rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-6 text-sm text-gray-500">
            Loading media…
          </div>
        ) : paginatedMedia.length === 0 ? (
          <div className="p-6 text-sm text-gray-500">
            No media found.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="text-left p-3">Title</th>
                <th className="text-left p-3">Type</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Created</th>
                <th className="text-right p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedMedia.map((m) => (
                <tr
                  key={m._id}
                  className="border-b last:border-0 hover:bg-gray-50"
                >
                  <td className="p-3 font-medium text-gray-900">
                    {m.title}
                  </td>

                  <td className="p-3 capitalize text-gray-600">
                    {m.type}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        m.status === "Published"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {m.status}
                    </span>
                  </td>

                  <td className="p-3 text-gray-600">
                    {new Date(m.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-3 text-right">
                    <div className="inline-flex gap-2 items-center">
                      <Link
                        to={`/admin/media/${m._id}/edit`}
                        className="p-1 hover:text-orange-600"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </Link>

                      <button
                        onClick={() => toggleStatus(m._id)}
                        title="Toggle status"
                      >
                        {m.status === "Published" ? (
                          <ToggleRight
                            size={20}
                            className="text-green-600"
                          />
                        ) : (
                          <ToggleLeft
                            size={20}
                            className="text-gray-400"
                          />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div>
          Showing{" "}
          {filteredMedia.length === 0
            ? 0
            : (page - 1) * pageSize + 1}
          –
          {Math.min(page * pageSize, filteredMedia.length)} of{" "}
          {filteredMedia.length}
        </div>

        <div className="flex gap-2 items-center">
          <select
            className="border rounded px-2 py-1"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
            <option value={50}>50 / page</option>
          </select>

          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Prev
          </button>

          <button
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
