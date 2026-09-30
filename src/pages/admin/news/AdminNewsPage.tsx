import { Edit, Eye, ToggleLeft, ToggleRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../utils/api";

type News = {
  _id: string;
  title: string;
  slug: string;
  status: "Draft" | "Published";
  createdAt: string;
};

export default function AdminNewsPage() {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    const res = await api.get("/news/admin/all");
    setNews(res.data);
  };

  const toggleStatus = async (id: string) => {
    await api.patch(`/news/${id}/toggle`);
    loadNews();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">News & Media</h1>
          <p className="text-sm text-gray-500">
            Manage SUKA Circle announcements & media
          </p>
        </div>

        <Link
          to="/admin/news/create"
          className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm"
        >
          + Create News
        </Link>
      </div>

      <div className="bg-white border rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Created</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {news.map((n) => (
              <tr key={n._id} className="border-b">
                <td className="p-3">{n.title}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      n.status === "Published"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100"
                    }`}
                  >
                    {n.status}
                  </span>
                </td>
                <td className="p-3">
                  {new Date(n.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3 text-right flex gap-2 justify-end">
                  <Eye size={16} />
                  <Edit size={16} />
                  <button onClick={() => toggleStatus(n._id)}>
                    {n.status === "Published" ? (
                      <ToggleRight className="text-green-600" />
                    ) : (
                      <ToggleLeft className="text-gray-400" />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
