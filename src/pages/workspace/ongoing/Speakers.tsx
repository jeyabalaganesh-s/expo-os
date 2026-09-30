import { useEffect, useState } from "react";
import {
  Linkedin,
  Twitter,
  User,
  Mic,
} from "lucide-react";

/* ================= TYPES ================= */

type Speaker = {
  id: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  sessions: string[];
  linkedin?: string;
  twitter?: string;
};

/* ================= MOCK DATA ================= */

const INITIAL_SPEAKERS: Speaker[] = [
  {
    id: "sp1",
    name: "Arun Kumar",
    title: "Founder",
    company: "SpiceCraft Foods",
    bio: "Food entrepreneur with 10+ years of experience building FMCG brands.",
    sessions: ["How to Build a Food Brand"],
    linkedin: "https://linkedin.com",
  },
  {
    id: "sp2",
    name: "Meena Raj",
    title: "Compliance Consultant",
    company: "FoodSafe India",
    bio: "Expert in FSSAI, labeling, and food packaging compliance.",
    sessions: ["Packaging & Compliance"],
    twitter: "https://twitter.com",
  },
];

/* ================= COMPONENT ================= */

export default function SpeakersPage() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  /* ================= INIT ================= */

  useEffect(() => {
    const saved = localStorage.getItem("event_speakers");
    setSpeakers(saved ? JSON.parse(saved) : INITIAL_SPEAKERS);
  }, []);

  /* ================= PERSIST ================= */

  useEffect(() => {
    localStorage.setItem(
      "event_speakers",
      JSON.stringify(speakers)
    );
  }, [speakers]);

  /* ================= UI ================= */

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Speakers
        </h1>
        <p className="text-sm text-gray-500">
          Meet the experts speaking at this event
        </p>
      </div>

      {/* SPEAKERS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {speakers.map((s) => (
          <div
            key={s.id}
            className="bg-white border rounded-xl p-4 space-y-3"
          >
            {/* HEADER */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <User size={18} className="text-gray-500" />
              </div>

              <div className="flex-1">
                <div className="font-medium text-gray-900">
                  {s.name}
                </div>
                <div className="text-sm text-gray-500">
                  {s.title} • {s.company}
                </div>
              </div>
            </div>

            {/* BIO */}
            <p className="text-sm text-gray-600">
              {s.bio}
            </p>

            {/* SESSIONS */}
            <div>
              <div className="text-xs text-gray-400 mb-1">
                Sessions
              </div>
              <div className="flex flex-wrap gap-2">
                {s.sessions.map((session) => (
                  <span
                    key={session}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-md text-xs"
                  >
                    <Mic size={12} />
                    {session}
                  </span>
                ))}
              </div>
            </div>

            {/* SOCIAL */}
            <div className="flex gap-3 pt-2">
              {s.linkedin && (
                <a
                  href={s.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-500 hover:text-blue-600"
                >
                  <Linkedin size={16} />
                </a>
              )}

              {s.twitter && (
                <a
                  href={s.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-500 hover:text-sky-500"
                >
                  <Twitter size={16} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
