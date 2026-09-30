// src/pages/webinars/AllWebinarsPage.tsx
import {
  Eye,
  Edit,
  ToggleLeft,
  ToggleRight,
  CalendarDays,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api";

type WebinarStatus = "Draft" | "Published" | "Completed" | "Cancelled";
type AccessType = "Public" | "Members Only";

type Webinar = {
  _id: string;
  title: string;
  speakers: { name: string }[];
  date: string;
  time: string;
  format?: { duration?: string };
  registrationsCount: number;
  access: AccessType;
  status: WebinarStatus;
  isVisible: boolean;
};

const statusStyle: Record<WebinarStatus, string> = {
  Draft: "bg-gray-100 text-gray-700",
  Published: "bg-green-100 text-green-700",
  Completed: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function AllWebinarsPage() {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* ================= FETCH WEBINARS ================= */
  useEffect(() => {
  const fetchWebinars = async () => {
    try {
      const res = await api.get("/admin/webinar");

      // ✅ SAFETY: normalize response
      const list =
        Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
          ? res.data.data
          : Array.isArray(res.data?.webinars)
          ? res.data.webinars
          : [];

      setWebinars(list);
    } catch (error) {
      console.error(error);
      alert("Failed to load webinars. Please try again.");
      setWebinars([]); // important
    } finally {
      setLoading(false);
    }
  };

  fetchWebinars();
}, []);


  /* ================= TOGGLE VISIBILITY ================= */
  const toggleVisibility = async (id: string) => {
    try {
      await api.patch(`/admin/webinars/${id}/visibility`);

      setWebinars((prev) =>
        prev.map((w) =>
          w._id === id ? { ...w, isVisible: !w.isVisible } : w
        )
      );
    } catch {
      alert("Failed to update visibility");
    }
  };

  if (loading) {
    return <div className="p-6 text-gray-500">Loading webinars…</div>;
  }

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            All Webinars
          </h1>
          <p className="text-sm text-gray-500">
            Manage webinars, access rules, and registrations
          </p>
        </div>

        <button
          onClick={() => navigate("/webinars/create")}
          className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-700"
        >
          + Create Webinar
        </button>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left p-3">Webinar</th>
              <th className="text-left p-3">Schedule</th>
              <th className="text-left p-3">Registrations</th>
              <th className="text-left p-3">Access</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Visibility</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {webinars.map((webinar) => (
              <tr
                key={webinar._id}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                <td className="p-3">
                  <div className="font-medium text-gray-900">
                    {webinar.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {webinar.speakers?.[0]?.name || "—"}
                  </div>
                </td>

                <td className="p-3 text-xs">
                  <div className="flex items-center gap-1">
                    <CalendarDays size={14} />
                    <span>{webinar.date}</span>
                  </div>
                  <div className="text-gray-500">
                    {webinar.time} •{" "}
                    {webinar.format?.duration || "—"}
                  </div>
                </td>

                <td className="p-3">
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span className="font-semibold">
                      {webinar.registrationsCount}
                    </span>
                  </div>
                </td>

                <td className="p-3">{webinar.access}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle[webinar.status]}`}
                  >
                    {webinar.status}
                  </span>
                </td>

                <td className="p-3">
                  <button
                    onClick={() => toggleVisibility(webinar._id)}
                  >
                    {webinar.isVisible ? (
                      <ToggleRight size={20} className="text-green-600" />
                    ) : (
                      <ToggleLeft size={20} className="text-gray-400" />
                    )}
                  </button>
                </td>

                <td className="p-3 text-right">
                  <div className="inline-flex gap-2">
                    <button
                      title="View"
                      onClick={() =>
                        navigate(`/webinars/${webinar._id}`)
                      }
                      className="p-1 hover:text-orange-600"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      title="Edit"
                      onClick={() =>
                        navigate(`/webinars/edit/${webinar._id}`)
                      }
                      className="p-1 hover:text-blue-600"
                    >
                      <Edit size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="text-sm text-gray-500">
        Total webinars: {webinars.length}
      </div>
    </div>
  );
}
