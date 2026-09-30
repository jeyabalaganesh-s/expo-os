import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import VideoPlayer from "../../components/VideoPlayer";
import { ArrowLeft, Lock } from "lucide-react";

/* ================= TYPES ================= */

type VideoMeta = {
  _id: string;
  title: string;
  category: string;
  accessLevel: "member" | "premium";
};

/* ================= PAGE ================= */

export default function MemberVideoWatch() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState<VideoMeta | null>(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= LOAD STREAM ================= */

  const loadStream = useCallback(async () => {
    try {
      setError("");
      const res = await api.get(
        `/member/videos/videos/${id}/stream`
      );

      // expected backend response:
      // { video: {...}, streamUrl: "..." }

      setVideo(res.data.video);
      setUrl(res.data.streamUrl);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Unable to load video"
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  /* ================= INITIAL LOAD ================= */

  useEffect(() => {
    loadStream();
  }, [loadStream]);

  /* ================= AUTO REFRESH STREAM URL ================= */
  useEffect(() => {
    if (!url) return;

    const interval = setInterval(() => {
      loadStream();
    }, 55 * 1000); // refresh before expiry

    return () => clearInterval(interval);
  }, [url, loadStream]);

  /* ================= UI STATES ================= */

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading video…
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
        >
          Go back
        </button>
      </div>
    );
  }

  if (!video || !url) {
    return (
      <div className="p-10 text-center text-gray-500">
        Video not available
      </div>
    );
  }

  /* ================= PAGE ================= */

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            {video.title}
          </h1>
          <p className="text-sm text-gray-500">
            {video.category}
          </p>
        </div>

        {video.accessLevel === "premium" && (
          <div className="ml-auto flex items-center gap-1 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
            <Lock size={12} />
            Premium
          </div>
        )}
      </div>

      {/* VIDEO PLAYER */}
      <VideoPlayer url={url} />

      {/* FOOTER */}
      <div className="text-xs text-gray-400 text-center">
        Secure streaming • Download disabled
      </div>
    </div>
  );
}
