import { useEffect, useState } from "react";
import PageShell from "../../../components/workspace/PageShell";
import {
  MapPin,
  Users,
  Phone,
  Mail,
  Globe,
  Edit,
  Save,
} from "lucide-react";
import api from "../../../utils/api";

/* ================= TYPES ================= */

type VenueMode = "Physical" | "Online" | "Hybrid";

type OnlinePlatform =
  | "Zoom"
  | "Google Meet"
  | "Microsoft Teams"
  | "YouTube Live"
  | "Custom";

type VenueType = {
  mode: VenueMode;

  /* Physical */
  name?: string;
  hallName?: string;
  address?: string;
  landmark?: string;
  mapLink?: string;
  capacity?: number;
  parkingAvailable?: boolean;
  wheelchairAccess?: boolean;
  entryInstructions?: string;

  /* Online */
  platform?: OnlinePlatform;
  onlineLink?: string;
  meetingId?: string;
  passcode?: string;
  hostName?: string;
  joinInstructions?: string;
  backupLink?: string;

  /* Contact */
  contactPerson?: string;
  phone?: string;
  email?: string;
  website?: string;

  /* Notes */
  notes?: string;
};

/* ================= COMPONENT ================= */

export default function Venue() {
  const eventPhase: "PRE" | "ONGOING" | "POST" = "PRE";

  const [venue, setVenue] = useState<VenueType | null>(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ================= SLUG ================= */

  const url = window.location.href;
  const base = url.split("/workspace")[0];
  const slug = base.split("//")[1].split(".")[0];

  /* ================= LOAD ================= */

  const fetchVenue = async () => {
    setLoading(true);

    const res = await api.get(`/venue/${slug}`);

    if (res.data) {
      setVenue(res.data);
    } else {
      setVenue({
        mode: "Physical",
        name: "",
        hallName: "",
        address: "",
        landmark: "",
        mapLink: "",
        capacity: 0,
        parkingAvailable: false,
        wheelchairAccess: false,
        entryInstructions: "",
        platform: "Zoom",
        onlineLink: "",
        meetingId: "",
        passcode: "",
        hostName: "",
        joinInstructions: "",
        backupLink: "",
        contactPerson: "",
        phone: "",
        email: "",
        website: "",
        notes: "",
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchVenue();
  }, []);

  /* ================= ACTIONS ================= */

  const updateField = (key: keyof VenueType, value: any) => {
    setVenue((prev) => ({ ...prev!, [key]: value }));
  };

  const saveVenue = async () => {
    if (!venue) return;

    await api.post("/venue", {
      slug,
      ...venue,
    });

    setEditing(false);
  };

  /* ================= GUARD ================= */

  if (loading || !venue) {
    return (
      <PageShell title="Venue">
        <div className="text-sm text-gray-500">
          Loading venue details…
        </div>
      </PageShell>
    );
  }

  /* ================= UI ================= */

  return (
    <PageShell
      title="Venue"
      description="Manage physical or online venue details for this event"
    >
      <div className="space-y-6 max-w-4xl">
        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center">
          <h2 className="font-medium text-sm text-gray-600">
            Venue Information
          </h2>

          {eventPhase === "PRE" && (
            <button
              onClick={() =>
                editing ? saveVenue() : setEditing(true)
              }
              className="flex items-center gap-2 px-4 py-2 rounded-md text-sm bg-orange-600 text-white"
            >
              {editing ? (
                <>
                  <Save size={14} /> Save
                </>
              ) : (
                <>
                  <Edit size={14} /> Edit
                </>
              )}
            </button>
          )}
        </div>

        {/* ================= VENUE MODE ================= */}
        <section className="bg-white border rounded-xl p-4 space-y-2">
          <label className="text-sm font-medium">Venue Type</label>

          {editing ? (
            <select
              value={venue.mode}
              onChange={(e) =>
                updateField("mode", e.target.value)
              }
              className="border rounded px-3 py-2 text-sm"
            >
              <option>Physical</option>
              <option>Online</option>
              <option>Hybrid</option>
            </select>
          ) : (
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
              {venue.mode}
            </span>
          )}
        </section>

        {/* ================= PHYSICAL VENUE ================= */}
        {(venue.mode === "Physical" ||
          venue.mode === "Hybrid") && (
          <section className="bg-white border rounded-xl p-4 space-y-4">
            <h3 className="font-medium text-sm">
              Physical Venue Details
            </h3>

            <input
              disabled={!editing}
              placeholder="Venue Name"
              value={venue.name || ""}
              onChange={(e) =>
                updateField("name", e.target.value)
              }
              className="w-full border rounded px-3 py-2 text-sm"
            />

            <input
              disabled={!editing}
              placeholder="Hall / Room Name"
              value={venue.hallName || ""}
              onChange={(e) =>
                updateField("hallName", e.target.value)
              }
              className="w-full border rounded px-3 py-2 text-sm"
            />

            <textarea
              disabled={!editing}
              placeholder="Address"
              value={venue.address || ""}
              onChange={(e) =>
                updateField("address", e.target.value)
              }
              className="w-full border rounded px-3 py-2 text-sm"
            />

            <input
              disabled={!editing}
              placeholder="Nearest Landmark"
              value={venue.landmark || ""}
              onChange={(e) =>
                updateField("landmark", e.target.value)
              }
              className="w-full border rounded px-3 py-2 text-sm"
            />

            <div className="flex items-center gap-2">
              <Users size={14} />
              <input
                disabled={!editing}
                type="number"
                value={venue.capacity || 0}
                onChange={(e) =>
                  updateField(
                    "capacity",
                    Number(e.target.value)
                  )
                }
                className="border rounded px-3 py-2 text-sm w-32"
              />
              <span className="text-xs text-gray-500">
                Max capacity
              </span>
            </div>

            <div className="flex gap-6 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  disabled={!editing}
                  checked={venue.parkingAvailable || false}
                  onChange={(e) =>
                    updateField(
                      "parkingAvailable",
                      e.target.checked
                    )
                  }
                />
                Parking Available
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  disabled={!editing}
                  checked={venue.wheelchairAccess || false}
                  onChange={(e) =>
                    updateField(
                      "wheelchairAccess",
                      e.target.checked
                    )
                  }
                />
                Wheelchair Accessible
              </label>
            </div>

            <textarea
              disabled={!editing}
              placeholder="Entry Instructions"
              value={venue.entryInstructions || ""}
              onChange={(e) =>
                updateField(
                  "entryInstructions",
                  e.target.value
                )
              }
              className="w-full border rounded px-3 py-2 text-sm"
            />

            {venue.mapLink && (
              <a
                href={venue.mapLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-blue-600"
              >
                <MapPin size={14} />
                View on Google Maps
              </a>
            )}
          </section>
        )}

        {/* ================= ONLINE VENUE ================= */}
        {(venue.mode === "Online" ||
          venue.mode === "Hybrid") && (
          <section className="bg-white border rounded-xl p-4 space-y-4">
            <h3 className="font-medium text-sm">
              Online Event Access
            </h3>

            <select
              disabled={!editing}
              value={venue.platform}
              onChange={(e) =>
                updateField("platform", e.target.value)
              }
              className="border rounded px-3 py-2 text-sm"
            >
              <option>Zoom</option>
              <option>Google Meet</option>
              <option>Microsoft Teams</option>
              <option>YouTube Live</option>
              <option>Custom</option>
            </select>

            <input
              disabled={!editing}
              placeholder="Meeting / Stream Link"
              value={venue.onlineLink || ""}
              onChange={(e) =>
                updateField("onlineLink", e.target.value)
              }
              className="w-full border rounded px-3 py-2 text-sm"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                disabled={!editing}
                placeholder="Meeting ID"
                value={venue.meetingId || ""}
                onChange={(e) =>
                  updateField("meetingId", e.target.value)
                }
                className="border rounded px-3 py-2 text-sm"
              />

              <input
                disabled={!editing}
                placeholder="Passcode"
                value={venue.passcode || ""}
                onChange={(e) =>
                  updateField("passcode", e.target.value)
                }
                className="border rounded px-3 py-2 text-sm"
              />
            </div>

            <input
              disabled={!editing}
              placeholder="Host / Moderator"
              value={venue.hostName || ""}
              onChange={(e) =>
                updateField("hostName", e.target.value)
              }
              className="w-full border rounded px-3 py-2 text-sm"
            />

            <textarea
              disabled={!editing}
              placeholder="Join Instructions"
              value={venue.joinInstructions || ""}
              onChange={(e) =>
                updateField(
                  "joinInstructions",
                  e.target.value
                )
              }
              className="w-full border rounded px-3 py-2 text-sm"
            />

            <input
              disabled={!editing}
              placeholder="Backup Stream Link"
              value={venue.backupLink || ""}
              onChange={(e) =>
                updateField("backupLink", e.target.value)
              }
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </section>
        )}

        {/* ================= CONTACT ================= */}
        <section className="bg-white border rounded-xl p-4 space-y-4">
          <h3 className="font-medium text-sm">Venue Contact</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <input
                disabled={!editing}
                value={venue.phone || ""}
                onChange={(e) =>
                  updateField("phone", e.target.value)
                }
                className="flex-1 border rounded px-3 py-2 text-sm"
              />
            </div>

            <div className="flex items-center gap-2">
              <Mail size={14} />
              <input
                disabled={!editing}
                value={venue.email || ""}
                onChange={(e) =>
                  updateField("email", e.target.value)
                }
                className="flex-1 border rounded px-3 py-2 text-sm"
              />
            </div>

            <div className="flex items-center gap-2 col-span-2">
              <Globe size={14} />
              <input
                disabled={!editing}
                value={venue.website || ""}
                onChange={(e) =>
                  updateField("website", e.target.value)
                }
                className="flex-1 border rounded px-3 py-2 text-sm"
              />
            </div>
          </div>
        </section>

        {/* ================= NOTES ================= */}
        <section className="bg-white border rounded-xl p-4">
          <textarea
            disabled={!editing}
            placeholder="Additional Notes"
            value={venue.notes || ""}
            onChange={(e) =>
              updateField("notes", e.target.value)
            }
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </section>

        {/* ================= LOCK INFO ================= */}
        {eventPhase !== "PRE" && (
          <div className="bg-gray-50 border rounded-xl p-4 text-sm text-gray-500">
            Venue details are locked after the event starts.
          </div>
        )}
      </div>
    </PageShell>
  );
}
