import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../utils/api";
import { ImagePlus, Loader2, X } from "lucide-react";

const isYouTubeUrl = (url: string) =>
  url?.includes("youtube.com") || url?.includes("youtu.be");

export default function AdminMediaForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const [form, setForm] = useState<any>({
    type: "news",
    title: "",
    slug: "",
    summary: "",
    description: "",
    content: "",
    coverImage: "",
    youtubeUrl: "",
    testimonialBy: "",
    testimonialRole: "",
    status: "Draft",
  });

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    if (!id) return;

    api.get(`/media/admin/${id}`).then((res) => {
      const data = res.data;

      if (
        data.type === "testimonial" &&
        isYouTubeUrl(data.description)
      ) {
        data.youtubeUrl = data.description;
        data.description = "";
      }

      setForm(data);
    });
  }, [id]);

  /* ================= IMAGE UPLOAD ================= */
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const res = await api.post("/upload/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setForm((prev: any) => ({
        ...prev,
        coverImage: res.data.url,
      }));
    } catch (err) {
      console.error("Image upload failed", err);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* ================= FILE SELECT ================= */
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.[0]) return;
    uploadImage(e.target.files[0]);
  };

  /* ================= DRAG & DROP ================= */
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.files?.[0]) {
      uploadImage(e.dataTransfer.files[0]);
    }
  };

  /* ================= FORM CHANGE ================= */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    const payload = { ...form };

    if (
      payload.type === "testimonial" &&
      isYouTubeUrl(payload.youtubeUrl)
    ) {
      payload.description = payload.youtubeUrl;
      payload.content = "";
    }

    if (id) {
      await api.patch(`/media/${id}`, payload);
    } else {
      await api.post("/media", payload);
    }

    navigate("/admin/media");
  };

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-2xl font-semibold">
        {id ? "Edit Media" : "Create Media"}
      </h1>

      {/* ================= TYPE ================= */}
      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="border p-2 rounded-md w-full"
      >
        <option value="news">News</option>
        <option value="video">Video (YouTube)</option>
        <option value="testimonial">Testimonial</option>
      </select>

      {/* ================= TITLE ================= */}
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="border p-2 rounded-md w-full"
      />

      {/* ================= COVER IMAGE (DRAG & DROP) ================= */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Cover Image
        </label>

        {form.coverImage ? (
          <div className="relative w-40 h-40 rounded-lg border overflow-hidden">
            <img
              src={form.coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />

            <button
              type="button"
              onClick={() =>
                setForm((prev: any) => ({
                  ...prev,
                  coverImage: "",
                }))
              }
              className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed rounded-lg cursor-pointer transition ${
              dragActive
                ? "border-orange-500 bg-orange-50"
                : "border-gray-300 hover:bg-gray-50"
            }`}
          >
            {uploading ? (
              <Loader2 className="animate-spin text-gray-400" />
            ) : (
              <>
                <ImagePlus className="text-gray-400" size={32} />
                <span className="text-xs text-gray-500 mt-2">
                  Drag & drop or click
                </span>
              </>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        )}
      </div>

      {/* ================= NEWS ================= */}
      {form.type === "news" && (
        <>
          <input
            name="slug"
            placeholder="Slug (seo-friendly)"
            value={form.slug}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />

          <textarea
            name="summary"
            placeholder="Summary"
            value={form.summary}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />

          <textarea
            name="content"
            placeholder="News content"
            value={form.content}
            onChange={handleChange}
            className="border p-2 rounded-md w-full h-48"
          />
        </>
      )}

      {/* ================= VIDEO ================= */}
      {form.type === "video" && (
        <input
          name="youtubeUrl"
          placeholder="YouTube video URL"
          value={form.youtubeUrl}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
        />
      )}

      {/* ================= TESTIMONIAL ================= */}
      {form.type === "testimonial" && (
        <>
          <input
            name="youtubeUrl"
            placeholder="YouTube video URL (optional)"
            value={form.youtubeUrl}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />

          <textarea
            name="content"
            placeholder="Text testimonial (optional)"
            value={form.content}
            onChange={handleChange}
            className="border p-2 rounded-md w-full h-28"
          />

          <input
            name="testimonialBy"
            placeholder="Person name"
            value={form.testimonialBy}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />

          <input
            name="testimonialRole"
            placeholder="Role / Company"
            value={form.testimonialRole}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />
        </>
      )}

      {/* ================= STATUS ================= */}
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="border p-2 rounded-md w-full"
      >
        <option value="Draft">Draft</option>
        <option value="Published">Published</option>
      </select>

      {/* ================= ACTIONS ================= */}
      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          className="bg-orange-600 text-white px-4 py-2 rounded-md"
        >
          Save
        </button>
        <button
          onClick={() => navigate("/admin/media")}
          className="border px-4 py-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
