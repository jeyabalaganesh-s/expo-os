
import { useState } from "react";
import {
  UserCheck,
  Search,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import api from "../../../utils/api";

/* ================= TYPES ================= */

type Attendee = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  checkedIn: boolean;
  checkedInAt?: string;
};

/* ================= COMPONENT ================= */

export default function ManualCheckInPage() {
  const [query, setQuery] = useState("");
  const [attendee, setAttendee] = useState<Attendee | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkingIn, setCheckingIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ================= SEARCH ================= */

  const searchAttendee = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError(null);
      setAttendee(null);

      const res = await api.get(
        "/event/attendees/search",
        { params: { query } }
      );

      setAttendee(res.data);
    } catch (err) {
      setError("Attendee not found");
    } finally {
      setLoading(false);
    }
  };

  /* ================= CHECK-IN ================= */

  const manualCheckIn = async () => {
    if (!attendee) return;

    setCheckingIn(true);

    try {
      const res = await api.patch(
        `/event/attendees/${attendee._id}/manual-checkin`
      );

      setAttendee(res.data);
    } catch (err) {
      alert("Check-in failed");
    } finally {
      setCheckingIn(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Manual Check-In
        </h1>
        <p className="text-sm text-gray-500">
          Verify attendee and mark entry manually
        </p>
      </div>

      {/* SEARCH */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Phone / Email / Registration ID"
            className="w-full pl-9 pr-3 py-2 border rounded-md text-sm"
          />
        </div>

        <button
          onClick={searchAttendee}
          className="px-4 py-2 bg-orange-600 text-white rounded-md text-sm hover:bg-orange-700"
        >
          Search
        </button>
      </div>

      {/* STATES */}
      {loading && (
        <div className="text-sm text-gray-400">
          Searching attendee…
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600">
          <AlertTriangle size={16} />
          {error}
        </div>
      )}

      {/* ATTENDEE CARD */}
      {attendee && (
        <div className="bg-white border rounded-xl p-4 space-y-4">
          <div>
            <div className="font-medium text-gray-900">
              {attendee.name}
            </div>
            <div className="text-sm text-gray-500">
              {attendee.email} • {attendee.phone}
            </div>
          </div>

          {attendee.checkedIn ? (
            <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
              <CheckCircle size={18} />
              Checked-in at{" "}
              {attendee.checkedInAt &&
                new Date(
                  attendee.checkedInAt
                ).toLocaleTimeString()}
            </div>
          ) : (
            <button
              disabled={checkingIn}
              onClick={manualCheckIn}
              className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-md text-sm hover:bg-green-700 disabled:opacity-50"
            >
              <UserCheck size={16} />
              Confirm Manual Check-In
            </button>
          )}
        </div>
      )}
    </div>
  );
}
