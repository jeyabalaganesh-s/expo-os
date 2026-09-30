import { useEffect, useRef, useState } from "react";
import { Award, Download, Eye } from "lucide-react";

/* ================= TYPES ================= */

type Attendee = {
  id: string;
  name: string;
  email: string;
  eligible: boolean;
};

type CertificateIssued = {
  attendeeId: string;
  issuedAt: string;
};

/* ================= MOCK DATA ================= */

const INITIAL_ATTENDEES: Attendee[] = [
  {
    id: "a1",
    name: "Ramesh Kumar",
    email: "ramesh@gmail.com",
    eligible: true,
  },
  {
    id: "a2",
    name: "Suresh Kumar",
    email: "suresh@gmail.com",
    eligible: false,
  },
  {
    id: "a3",
    name: "Priya Sharma",
    email: "priya@gmail.com",
    eligible: true,
  },
];

/* ================= COMPONENT ================= */

export default function WorkspaceCertificate() {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [issued, setIssued] = useState<CertificateIssued[]>([]);
  const [preview, setPreview] = useState<Attendee | null>(
    null
  );

  const certRef = useRef<HTMLDivElement>(null);

  /* ================= INIT ================= */

  useEffect(() => {
    const savedIssued = localStorage.getItem(
      "event_certificates_issued"
    );
    setIssued(savedIssued ? JSON.parse(savedIssued) : []);
    setAttendees(INITIAL_ATTENDEES);
  }, []);

  /* ================= PERSIST ================= */

  useEffect(() => {
    localStorage.setItem(
      "event_certificates_issued",
      JSON.stringify(issued)
    );
  }, [issued]);

  /* ================= ACTIONS ================= */

  const issueCertificate = (attendee: Attendee) => {
    if (!attendee.eligible) return;

    setIssued((prev) => [
      ...prev,
      {
        attendeeId: attendee.id,
        issuedAt: new Date().toISOString(),
      },
    ]);

    setPreview(attendee);
  };

  const downloadCertificate = () => {
    if (!certRef.current) return;

    const printWindow = window.open("", "", "width=900,height=650");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Certificate</title>
          <style>
            body { font-family: serif; padding: 40px; }
          </style>
        </head>
        <body>
          ${certRef.current.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const isIssued = (id: string) =>
    issued.some((i) => i.attendeeId === id);

  /* ================= UI ================= */

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Certificates
        </h1>
        <p className="text-sm text-gray-500">
          Issue and download event certificates
        </p>
      </div>

      {/* ATTENDEE TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-center">
                Eligibility
              </th>
              <th className="p-3 text-right">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {attendees.map((a) => (
              <tr
                key={a.id}
                className="border-b last:border-0"
              >
                <td className="p-3 font-medium">
                  {a.name}
                </td>
                <td className="p-3">{a.email}</td>
                <td className="p-3 text-center">
                  {a.eligible ? "Yes" : "No"}
                </td>
                <td className="p-3 text-right">
                  {a.eligible && (
                    <button
                      disabled={isIssued(a.id)}
                      onClick={() =>
                        issueCertificate(a)
                      }
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-600 text-white rounded-md text-xs hover:bg-orange-700 disabled:opacity-50"
                    >
                      <Award size={14} />
                      {isIssued(a.id)
                        ? "Issued"
                        : "Issue"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PREVIEW */}
      {preview && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Eye size={16} />
            <span className="font-medium">
              Certificate Preview
            </span>
          </div>

          <div
            ref={certRef}
            className="bg-white border rounded-xl p-10 text-center space-y-4"
          >
            <h2 className="text-2xl font-semibold">
              Certificate of Participation
            </h2>

            <p>This is proudly presented to</p>

            <div className="text-3xl font-bold">
              {preview.name}
            </div>

            <p>
              for attending the event
              <br />
              <strong>
                “Foodpreneurs Growth Summit 2026”
              </strong>
            </p>

            <p className="text-sm">
              Date:{" "}
              {new Date().toLocaleDateString()}
            </p>
          </div>

          <button
            onClick={downloadCertificate}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700"
          >
            <Download size={16} />
            Download Certificate
          </button>
        </div>
      )}
    </div>
  );
}
