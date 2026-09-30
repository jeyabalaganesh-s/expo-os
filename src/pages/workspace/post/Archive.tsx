import { useEffect, useState } from "react";
import {
  Archive,
  Calendar,
  Lock,
  CheckCircle,
} from "lucide-react";

/* ================= TYPES ================= */

type ArchiveInfo = {
  archivedAt: string;
  archivedBy: string;
  reason: string;
};

/* ================= COMPONENT ================= */

export default function WorkspaceArchive() {
  const [archived, setArchived] = useState(false);
  const [info, setInfo] = useState<ArchiveInfo | null>(
    null
  );

  /* ================= INIT ================= */

  useEffect(() => {
    const saved = localStorage.getItem("event_archive");
    if (saved) {
      const data = JSON.parse(saved);
      setArchived(true);
      setInfo(data);
    }
  }, []);

  /* ================= ARCHIVE ACTION ================= */

  const archiveEvent = () => {
    const archiveInfo: ArchiveInfo = {
      archivedAt: new Date().toISOString(),
      archivedBy: "Admin",
      reason: "Event completed successfully",
    };

    localStorage.setItem(
      "event_archive",
      JSON.stringify(archiveInfo)
    );

    setArchived(true);
    setInfo(archiveInfo);
  };

  /* ================= UI ================= */

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Event Archive
        </h1>
        <p className="text-sm text-gray-500">
          Archived events are locked and read-only
        </p>
      </div>

      {/* ACTIVE STATE */}
      {!archived && (
        <div className="bg-white border rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-orange-600">
            <Archive size={20} />
            <span className="font-medium">
              Archive this event?
            </span>
          </div>

          <p className="text-sm text-gray-600">
            Once archived, this event will be locked.
            No further edits, check-ins, payments, or
            interactions will be allowed.
          </p>

          <button
            onClick={archiveEvent}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700"
          >
            <Archive size={16} />
            Archive Event
          </button>
        </div>
      )}

      {/* ARCHIVED STATE */}
      {archived && info && (
        <div className="bg-gray-50 border border-dashed rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle size={20} />
            <span className="font-medium">
              Event Archived
            </span>
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              Archived on{" "}
              {new Date(
                info.archivedAt
              ).toLocaleString()}
            </div>

            <div className="flex items-center gap-2">
              <Lock size={14} />
              Archived by {info.archivedBy}
            </div>

            <div>
              <span className="font-medium">
                Reason:
              </span>{" "}
              {info.reason}
            </div>
          </div>

          <div className="bg-white border rounded-md p-4 text-sm text-gray-500">
            This event is now read-only. You can still
            access:
            <ul className="list-disc pl-5 mt-2">
              <li>Summary</li>
              <li>Reports</li>
              <li>Feedback</li>
              <li>Recordings</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
