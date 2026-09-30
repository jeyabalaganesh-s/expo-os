// src/pages/customer/SupportPage.tsx
import { useState } from "react";

export default function SupportPage() {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function submitRequest(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitted(true);
    setMessage("");
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Support</h1>
        <p className="text-sm text-gray-500">
          Need help? Contact the event support team.
        </p>
      </div>

      {/* Contact info */}
      <div className="bg-white border rounded p-4">
        <h2 className="font-semibold mb-3">Contact Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <Field label="Support Email" value="support@sukaexpo.com" />
          <Field label="Support Phone" value="+91 90000 12345" />
          <Field label="Event Help Desk" value="Hall A – Gate 2" />
          <Field label="Available Hours" value="9:00 AM – 7:00 PM" />
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white border rounded p-4">
        <h2 className="font-semibold mb-3">Frequently Asked Questions</h2>

        <ul className="space-y-3 text-sm">
          <li>
            <strong>When can I set up my stall?</strong>
            <div className="text-gray-600">
              Stall setup starts one day before the event, from 10:00 AM.
            </div>
          </li>
          <li>
            <strong>Can I re-enter the venue?</strong>
            <div className="text-gray-600">
              Yes, your QR pass allows multiple entries.
            </div>
          </li>
          <li>
            <strong>Who do I contact for power issues?</strong>
            <div className="text-gray-600">
              Please visit the on-site help desk or raise a support request.
            </div>
          </li>
        </ul>
      </div>

      {/* Support request */}
      <div className="bg-white border rounded p-4">
        <h2 className="font-semibold mb-3">Raise a Support Request</h2>

        {submitted ? (
          <div className="bg-green-50 border border-green-300 rounded p-3 text-sm text-green-700">
            ✅ Your request has been submitted. Our team will contact you soon.
          </div>
        ) : (
          <form onSubmit={submitRequest} className="space-y-3">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Describe your issue..."
              className="w-full border rounded p-2 text-sm"
            />

            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded"
            >
              Submit Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

/* -----------------------
   Field Component
----------------------- */

function Field({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}
