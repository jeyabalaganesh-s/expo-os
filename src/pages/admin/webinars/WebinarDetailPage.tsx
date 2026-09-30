import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../utils/api";
import {
  Calendar,
  Clock,
  MapPin,

  Video,
} from "lucide-react";

/* ================= TYPES ================= */

type Event = {
  _id: string;
  title: string;
  description?: string;
  date?: string;
  time?: string;
  location?: string;
  status?: string;

  speakers?: {
    name: string;
    title?: string;
    img?: string;
  }[];

  agenda?: string[];
  whyAttend?: {
    title?: string;
    points?: string[];
  };

  format?: {
    mode?: string;
    duration?: string;
    language?: string;
    interaction?: string;
  };

  highlights?: {
    label: string;
    value: string;
  }[];

  pricing?: {
    type?: string;
    price?: string;
  };

  cta?: {
    label?: string;
    link?: string;
  };
};

export default function WebinarDetailPage() {
  const { id } = useParams();
  const [webinar, setWebinar] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */

  useEffect(() => {
    const fetchWebinar = async () => {
      try {
        const { data } = await api.get(
          `/event/admin/events/${id}`
        );
        setWebinar(data);
      } catch {
        setWebinar(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWebinar();
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 text-gray-500">
        Loading webinar…
      </div>
    );
  }

  if (!webinar) {
    return (
      <div className="p-8 text-red-600">
        Webinar not found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      {/* ================= HEADER ================= */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold">
          {webinar.title}
        </h1>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {webinar.date && (
            <span className="flex items-center gap-1">
              <Calendar size={16} />
              {webinar.date}
            </span>
          )}

          {webinar.time && (
            <span className="flex items-center gap-1">
              <Clock size={16} />
              {webinar.time}
            </span>
          )}

          {webinar.location && (
            <span className="flex items-center gap-1">
              <MapPin size={16} />
              {webinar.location}
            </span>
          )}

          {webinar.format?.mode && (
            <span className="flex items-center gap-1">
              <Video size={16} />
              {webinar.format.mode}
            </span>
          )}
        </div>
      </div>

      {/* ================= DESCRIPTION ================= */}
      {webinar.description && (
        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold mb-2">
            About the Webinar
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {webinar.description}
          </p>
        </div>
      )}

      {/* ================= HIGHLIGHTS ================= */}
      {webinar.highlights?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {webinar.highlights.map((h, i) => (
            <div
              key={i}
              className="bg-gray-50 border rounded-lg p-4"
            >
              <div className="text-xs text-gray-500">
                {h.label}
              </div>
              <div className="font-medium">
                {h.value}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {/* ================= WHY ATTEND ================= */}
      {webinar.whyAttend?.points?.length && (
        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold mb-4">
            Why You Should Attend
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {webinar.whyAttend.points.map(
              (point, i) => (
                <li key={i}>{point}</li>
              )
            )}
          </ul>
        </div>
      )}

      {/* ================= AGENDA ================= */}
      {webinar.agenda?.length && (
        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold mb-4">
            Agenda
          </h2>
          <ul className="space-y-2 text-gray-700">
            {webinar.agenda.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ================= SPEAKERS ================= */}
      {webinar.speakers?.length && (
        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold mb-4">
            Speakers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {webinar.speakers.map((s, i) => (
              <div
                key={i}
                className="border rounded-lg p-4"
              >
                <div className="font-medium">
                  {s.name}
                </div>
                {s.title && (
                  <div className="text-sm text-gray-500">
                    {s.title}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= CTA ================= */}
      {webinar.cta?.link && (
        <div className="flex justify-center pt-6">
          <a
            href={webinar.cta.link}
            target="_blank"
            rel="noreferrer"
            className="px-8 py-3 bg-orange-600 text-white rounded-lg text-sm hover:bg-orange-700"
          >
            {webinar.cta.label || "Join Webinar"}
          </a>
        </div>
      )}
    </div>
  );
}
