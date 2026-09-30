import { useState } from "react";

export default function CreateTemplatePage() {
  const [channel, setChannel] = useState("WhatsApp");
  const [status, setStatus] = useState("Draft");
  const [message, setMessage] = useState("");

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Create Template
          </h1>
          <p className="text-sm text-gray-500">
            Create and manage message templates for campaigns
          </p>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-50">
            Cancel
          </button>
          <button className="px-4 py-2 text-sm rounded-lg bg-black text-white hover:bg-gray-900">
            Save Template
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl border shadow-sm p-6 space-y-5">
            <h2 className="font-medium text-gray-900">Template Details</h2>

            {/* Template Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Template Name
              </label>
              <input
                type="text"
                placeholder="Exhibitor Welcome Message"
                className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>

            {/* Channel */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Channel
              </label>
              <div className="flex gap-3">
                {["WhatsApp", "Email"].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setChannel(c)}
                    className={`px-4 py-2 rounded-lg text-sm border transition ${
                      channel === c
                        ? "bg-black text-white border-black"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm"
              >
                <option>Draft</option>
                <option>Pending Approval</option>
                <option>Approved</option>
              </select>
            </div>
          </div>

          {/* Message Content */}
          <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
            <h2 className="font-medium text-gray-900">Message Content</h2>

            <textarea
              rows={8}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                channel === "WhatsApp"
                  ? "Hi {{name}}, welcome to {{event_name}}..."
                  : "Dear {{name}},\n\nThank you for registering..."
              }
              className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
            />

            {/* Variables helper */}
            <div className="flex flex-wrap gap-2">
              {[
                "{{name}}",
                "{{event_name}}",
                "{{date}}",
                "{{amount}}",
                "{{payment_link}}",
              ].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setMessage((m) => m + " " + v)}
                  className="text-xs px-2 py-1 rounded-md border hover:bg-gray-50"
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Preview */}
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="font-medium text-gray-900 mb-3">
            Live Preview
          </h2>

          <div className="rounded-lg border bg-gray-50 p-4 text-sm text-gray-700 whitespace-pre-wrap min-h-[200px]">
            {message || "Start typing your message to see preview..."}
          </div>

          <div className="mt-4 text-xs text-gray-500">
            Channel: <span className="font-medium">{channel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
