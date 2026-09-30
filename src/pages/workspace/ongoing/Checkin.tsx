import { useEffect, useRef, useState } from "react";
import {
  CheckCircle,
  Camera,
  X,
} from "lucide-react";
import api from "../../../utils/api";
import { Html5Qrcode } from "html5-qrcode";

/* ================= TYPES ================= */

type Attendee = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  checkedIn: boolean;
  checkedInAt?: string;
};

export default function CheckInPage() {
  const [search, setSearch] = useState("");
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(false);
  const [checkingIn, setCheckingIn] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  /* CAMERA */
  const [openScanner, setOpenScanner] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerActiveRef = useRef(false);

  /* ================= SEARCH ================= */

  const fetchAttendees = async (value?: string) => {
    const query = value ?? search;
    if (!query.trim()) return;

    try {
      setLoading(true);
      setSearched(true);

      const res = await api.get("/event/attendees", {
        params: { search: query },
      });

      setAttendees(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch {
      setAttendees([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= CHECK-IN ================= */

  const checkInAttendee = async (id: string) => {
    try {
      setCheckingIn(id);
      const res = await api.patch(`/event/attendees/${id}/checkin`);

      setAttendees((prev) =>
        prev.map((a) =>
          a._id === id
            ? {
                ...a,
                checkedIn: true,
                checkedInAt:
                  res.data?.checkedInAt ??
                  new Date().toISOString(),
              }
            : a
        )
      );
    } finally {
      setCheckingIn(null);
    }
  };

  /* ================= QR SCANNER ================= */

  useEffect(() => {
    checkingIn && fetchAttendees();
  }, [checkingIn]);

  useEffect(() => {
    if (!openScanner) return;

    // 🚫 Camera blocked on HTTP
    if (
      location.protocol !== "https:" &&
      location.hostname !== "localhost"
    ) {
      alert("Camera access requires HTTPS");
      setOpenScanner(false);
      return;
    }

    const scanner = new Html5Qrcode("qr-reader");
    scannerRef.current = scanner;
    scannerActiveRef.current = true;

    scanner
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        async (decodedText) => {
          if (!scannerActiveRef.current) return;

          scannerActiveRef.current = false;

          try {
            await scanner.stop();
          } catch {}

          scannerRef.current = null;
          setOpenScanner(false);

          setSearch(decodedText);
          fetchAttendees(decodedText);
        },
        (errorMessage) => {
          console.error("QR scan error:", errorMessage);
        }
      )
      .catch(() => {
        alert("Unable to access camera");
        scannerActiveRef.current = false;
        setOpenScanner(false);
      });

    return () => {
      if (scannerRef.current && scannerActiveRef.current) {
        scannerActiveRef.current = false;
        scannerRef.current.stop().catch(() => {});
        scannerRef.current = null;
      }
    };
  }, [openScanner]);

  /* ================= UI ================= */

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">
          Event Check-In
        </h1>
        <p className="text-sm text-gray-500">
          Search or scan QR to check in attendees
        </p>
      </div>

      {/* SEARCH */}
      <div className="flex gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by phone, email, name, or ticket ID"
          className="flex-1 border px-3 py-2 rounded-md text-sm"
        />

        <button
          onClick={() => fetchAttendees()}
          className="px-4 py-2 bg-orange-600 text-white rounded-md"
        >
          Search
        </button>

        <button
          onClick={() => setOpenScanner(true)}
          className="px-3 py-2 border rounded-md"
        >
          <Camera size={18} />
        </button>
      </div>

      {/* RESULTS */}
      <div className="bg-white border rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-6 text-center">Searching…</div>
        ) : attendees.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            {searched
              ? "No attendees found"
              : "Search or scan to check in"}
          </div>
        ) : (
          <table className="w-full text-sm">
            <tbody>
              {attendees.map((a) => (
                <tr key={a._id} className="border-b">
                  <td className="p-3">{a.name}</td>
                  <td className="p-3">{a.email}</td>
                  <td className="p-3">
                    {a.checkedIn ? (
                      <CheckCircle
                        size={14}
                        className="text-green-600"
                      />
                    ) : (
                      <button
                        onClick={() =>
                          checkInAttendee(a._id)
                        }
                        className="text-xs bg-green-600 text-white px-2 py-1 rounded"
                      >
                        Check In
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* QR MODAL */}
      {openScanner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-xl w-80">
            <div className="flex justify-between mb-2">
              <span className="font-medium text-sm">
                Scan QR Code
              </span>
              <button onClick={() => setOpenScanner(false)}>
                <X size={16} />
              </button>
            </div>
            <div id="qr-reader" />
          </div>
        </div>
      )}
    </div>
  );
}
