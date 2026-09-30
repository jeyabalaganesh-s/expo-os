import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../utils/api";

/* ================= TYPES ================= */

type Speaker = { name: string; title?: string; img?: string };
type Highlight = { label: string; value: string };

export default function EditWebinarPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ================= BASIC ================= */

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("Online");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("draft");

  /* ================= FORMAT ================= */

  const [format, setFormat] = useState({
    mode: "Online",
    duration: "",
    language: "English",
    interaction: "Live Q&A",
  });

  /* ================= ARRAYS ================= */

  const [whyAttendTitle, setWhyAttendTitle] = useState("");
  const [whyAttendPoints, setWhyAttendPoints] = useState<string[]>([]);
  const [agenda, setAgenda] = useState<string[]>([]);
  const [whoShouldAttend, setWhoShouldAttend] = useState<string[]>([]);
  const [networkingWith, setNetworkingWith] = useState<string[]>([]);
  const [outcomes, setOutcomes] = useState<string[]>([]);
  const [memberBenefits, setMemberBenefits] = useState<string[]>([]);
  const [importantNotes, setImportantNotes] = useState<string[]>([]);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [highlights, setHighlights] = useState<Highlight[]>([]);

  /* ================= PRICING & CTA ================= */

  const [pricingType, setPricingType] = useState("free");
  const [price, setPrice] = useState("");
  const [ctaLabel, setCtaLabel] = useState("Join Webinar");
  const [ctaLink, setCtaLink] = useState("");

  /* ================= FETCH ================= */

  useEffect(() => {
    const fetchWebinar = async () => {
      try {
        const { data } = await api.get(`/event/admin/events/${id}`);

        setTitle(data.title || "");
        setDate(data.date || "");
        setTime(data.time || "");
        setLocation(data.location || "Online");
        setDescription(data.description || "");
        setStatus(data.status || "draft");

        setFormat(data.format || format);

        setWhyAttendTitle(data.whyAttend?.title || "");
        setWhyAttendPoints(data.whyAttend?.points || []);
        setAgenda(data.agenda || []);
        setWhoShouldAttend(data.whoShouldAttend || []);
        setNetworkingWith(data.networkingWith || []);
        setOutcomes(data.outcomes || []);
        setMemberBenefits(data.memberBenefits || []);
        setImportantNotes(data.importantNotes || []);
        setSpeakers(data.speakers || []);
        setHighlights(data.highlights || []);

        setPricingType(data.pricing?.type || "free");
        setPrice(data.pricing?.price || "");
        setCtaLabel(data.cta?.label || "Join Webinar");
        setCtaLink(data.cta?.link || "");
      } catch {
        alert("Failed to load webinar");
        navigate("/webinars");
      } finally {
        setLoading(false);
      }
    };

    fetchWebinar();
  }, [id]);

  /* ================= SAVE ================= */

  const submit = async () => {
    const payload = {
      title,
      type: "Webinar",
      date,
      time,
      location,
      description,
      status,

      format,

      whyAttend: {
        title: whyAttendTitle,
        points: whyAttendPoints,
      },

      agenda,
      whoShouldAttend,
      networkingWith,
      outcomes,
      memberBenefits,
      importantNotes,

      speakers,
      highlights,

      pricing: {
        type: pricingType,
        price,
      },

      cta: {
        label: ctaLabel,
        link: ctaLink,
      },
    };

    try {
      setSaving(true);
      await api.put(`/event/admin/events/${id}`, payload);
      alert("Webinar updated successfully");
      navigate("/admin/webinars");
    } catch {
      alert("Failed to update webinar");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Loading…</div>;

  /* ================= UI HELPERS ================= */

  const ListBox = ({
    title,
    items,
    setItems,
  }: {
    title: string;
    items: string[];
    setItems: (v: string[]) => void;
  }) => (
    <div className="bg-white border rounded-xl p-6 space-y-3">
      <div className="flex justify-between">
        <h2 className="font-semibold">{title}</h2>
        <button
          onClick={() => setItems([...items, ""])}
          className="text-orange-600 text-sm"
        >
          + Add
        </button>
      </div>

      {items.map((v, i) => (
        <div key={i} className="flex gap-2">
          <input
            className="border p-2 flex-1"
            value={v}
            onChange={(e) =>
              setItems(
                items.map((x, idx) =>
                  idx === i ? e.target.value : x
                )
              )
            }
          />
          <button
            onClick={() =>
              setItems(items.filter((_, idx) => idx !== i))
            }
            className="text-red-500"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );

  /* ================= RENDER ================= */

  return (
    <div className="max-w-6xl space-y-6">
      <h1 className="text-2xl font-semibold">Edit Webinar</h1>

      {/* BASIC */}
      <div className="bg-white border rounded-xl p-6 space-y-4">
        <h2 className="font-semibold">Basic Information</h2>
        <input className="border p-2 w-full" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <textarea className="border p-2 w-full" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        <div className="grid grid-cols-2 gap-4">
          <input type="date" className="border p-2" value={date} onChange={(e) => setDate(e.target.value)} />
          <input className="border p-2" value={time} onChange={(e) => setTime(e.target.value)} placeholder="Time" />
        </div>
      </div>

      {/* FORMAT */}
      <div className="bg-white border rounded-xl p-6 space-y-3">
        <h2 className="font-semibold">Format</h2>
        {Object.entries(format).map(([k, v]) => (
          <input
            key={k}
            className="border p-2 w-full"
            value={v}
            placeholder={k}
            onChange={(e) =>
              setFormat({ ...format, [k]: e.target.value })
            }
          />
        ))}
      </div>

      <ListBox title="Why Attend – Points" items={whyAttendPoints} setItems={setWhyAttendPoints} />
      <ListBox title="Agenda" items={agenda} setItems={setAgenda} />
      <ListBox title="Who Should Attend" items={whoShouldAttend} setItems={setWhoShouldAttend} />
      <ListBox title="Networking With" items={networkingWith} setItems={setNetworkingWith} />
      <ListBox title="Outcomes" items={outcomes} setItems={setOutcomes} />
      <ListBox title="Member Benefits" items={memberBenefits} setItems={setMemberBenefits} />
      <ListBox title="Important Notes" items={importantNotes} setItems={setImportantNotes} />

      {/* CTA */}
      <div className="bg-white border rounded-xl p-6 space-y-3">
        <h2 className="font-semibold">CTA</h2>
        <input className="border p-2 w-full" value={ctaLabel} onChange={(e) => setCtaLabel(e.target.value)} placeholder="CTA Label" />
        <input className="border p-2 w-full" value={ctaLink} onChange={(e) => setCtaLink(e.target.value)} placeholder="CTA Link" />
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3">
        <button onClick={() => navigate(-1)} className="border px-4 py-2 rounded">
          Cancel
        </button>
        <button
          onClick={submit}
          disabled={saving}
          className="bg-orange-600 text-white px-6 py-2 rounded disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
