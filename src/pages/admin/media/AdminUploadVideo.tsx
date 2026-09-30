// src/pages/admin/resources/AdminUploadVideo.tsx
import { useState } from "react";
import api from "../../../utils/api";
import { Video } from "lucide-react";

export default function AdminUploadVideo() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    accessLevel: "member",
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [dragActive, setDragActive] = useState(false);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!videoFile) {
      setMessage("❌ Please select a video file");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const data = new FormData();
      data.append("video", videoFile);
      data.append("title", form.title);
      data.append("category", form.category);
      data.append("accessLevel", form.accessLevel);

      await api.post("/admin/videos/videos", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("✅ Video uploaded successfully");
      setForm({
        title: "",
        category: "",
        accessLevel: "member",
      });
      setVideoFile(null);
    } catch (err: any) {
      setMessage(
        err?.response?.data?.message || "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Upload Video Resource
        </h2>
        <p className="text-gray-500 mt-1">
          Upload a private video for members
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-6 space-y-5"
      >
        {message && (
          <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
            {message}
          </div>
        )}

        <Input
          label="Video Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Pricing Strategy Masterclass"
        />

        <Input
          label="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Pricing / Branding / Operations"
        />

        {/* FILE UPLOAD */}
        {/* FILE UPLOAD – DRAG & DROP */}
<div>
  <label className="text-sm text-gray-600">
    Video File (MP4)
  </label>

  <div
    onDragEnter={(e) => {
      e.preventDefault();
      setDragActive(true);
    }}
    onDragOver={(e) => {
      e.preventDefault();
      setDragActive(true);
    }}
    onDragLeave={() => setDragActive(false)}
    onDrop={(e) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files?.[0];
      if (file) setVideoFile(file);
    }}
    className={`mt-2 border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition
      ${
        dragActive
          ? "border-orange-600 bg-orange-50"
          : "border-gray-300 hover:border-orange-400"
      }`}
    onClick={() =>
      document.getElementById("videoInput")?.click()
    }
  >
    <p className="text-sm text-gray-600">
      {videoFile
        ? "Video selected"
        : "Drag & drop video here or click to browse"}
    </p>

    <p className="text-xs text-gray-400 mt-1">
      MP4 format recommended
    </p>

    {videoFile && (
      <div className="mt-3 text-sm text-gray-700">
        <strong>{videoFile.name}</strong>
        <div className="text-xs text-gray-500">
          {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
        </div>
      </div>
    )}
  </div>

  {/* Hidden input */}
  <input
    id="videoInput"
    type="file"
    accept="video/mp4,video/*"
    onChange={(e) =>
      setVideoFile(e.target.files?.[0] || null)
    }
    className="hidden"
  />
</div>


        <div>
          <label className="text-sm text-gray-600">
            Access Level
          </label>
          <select
            name="accessLevel"
            value={form.accessLevel}
            onChange={handleChange}
            className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
          >
            <option value="member">Member</option>
            <option value="premium">Premium</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-orange-600 text-white text-sm hover:bg-orange-700 disabled:opacity-60"
        >
          <Video size={16} />
          {loading ? "Uploading..." : "Publish Video"}
        </button>
      </form>
    </div>
  );
}

/* ================= INPUT ================= */

function Input({
  label,
  ...props
}: {
  label: string;
  [key: string]: any;
}) {
  return (
    <div>
      <label className="text-sm text-gray-600">
        {label}
      </label>
      <input
        {...props}
        required
        className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
      />
    </div>
  );
}
