import { useEffect, useState } from "react";
import { PlayCircle, Video, ExternalLink } from "lucide-react";

/* ================= TYPES ================= */

type RecordingType = "video" | "link";

type Recording = {
  id: string;
  title: string;
  speaker: string;
  duration: string;
  type: RecordingType;
  url: string;
};

/* ================= MOCK DATA ================= */

const INITIAL_RECORDINGS: Recording[] = [
  {
    id: "r1",
    title: "Opening Keynote",
    speaker: "Arun Kumar",
    duration: "45 mins",
    type: "video",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "r2",
    title: "Packaging & Compliance",
    speaker: "Meena Raj",
    duration: "30 mins",
    type: "link",
    url: "https://youtube.com",
  },
];

/* ================= COMPONENT ================= */

export default function WorkspaceRecordings() {
  const [recordings, setRecordings] = useState<Recording[]>(
    []
  );
  const [active, setActive] =
    useState<Recording | null>(null);

  /* ================= INIT ================= */

  useEffect(() => {
    const saved = localStorage.getItem(
      "event_recordings"
    );
    setRecordings(
      saved ? JSON.parse(saved) : INITIAL_RECORDINGS
    );
  }, []);

  /* ================= UI ================= */

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Event Recordings
        </h1>
        <p className="text-sm text-gray-500">
          Watch session replays from the event
        </p>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LIST */}
        <div className="md:col-span-1 bg-white border rounded-xl overflow-hidden">
          {recordings.map((r) => (
            <button
              key={r.id}
              onClick={() => setActive(r)}
              className={`w-full text-left p-4 border-b last:border-0 hover:bg-gray-50 ${
                active?.id === r.id
                  ? "bg-orange-50"
                  : ""
              }`}
            >
              <div className="flex items-start gap-2">
                <PlayCircle
                  size={18}
                  className="text-orange-600 mt-1"
                />
                <div>
                  <div className="font-medium text-sm">
                    {r.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {r.speaker} • {r.duration}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* PLAYER */}
        <div className="md:col-span-2 bg-white border rounded-xl p-4">
          {!active ? (
            <div className="flex flex-col items-center justify-center text-gray-400 h-64">
              <Video size={32} />
              <span className="text-sm mt-2">
                Select a recording to play
              </span>
            </div>
          ) : active.type === "video" ? (
            <div className="space-y-3">
              <video
                src={active.url}
                controls
                className="w-full rounded-lg"
              />
              <div>
                <div className="font-medium">
                  {active.title}
                </div>
                <div className="text-xs text-gray-500">
                  {active.speaker} • {active.duration}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 space-y-3">
              <ExternalLink size={32} />
              <div className="text-sm text-gray-600">
                This recording is hosted externally
              </div>
              <a
                href={active.url}
                target="_blank"
                rel="noreferrer"
                className="text-orange-600 hover:underline text-sm"
              >
                Open Recording
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
