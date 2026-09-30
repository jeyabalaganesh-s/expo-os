import React, { useState } from "react";

/* -----------------------------
   Types
----------------------------- */
type Channel = "WhatsApp" | "Email";
type ScheduleType = "Now" | "Schedule";

interface Template {
  id: string;
  name: string;
  content?: string;
}

const templates: Template[] = [
  {
    id: "TMP-001",
    name: "Exhibitor Welcome",
    content: "Hi {{name}}, welcome to {{event_name}}.",
  },
  {
    id: "TMP-002",
    name: "Payment Reminder",
    content:
      "Dear {{name}}, your payment of {{amount}} is pending. Please complete it soon.",
  },
];

const audiences: string[] = [
  "All Exhibitors",
  "Pending Payment",
  "Registered Visitors",
  "Custom Filter",
];

export default function CreateCampaignPage(): React.ReactElement {
  const [campaignName, setCampaignName] = useState<string>("");
  const [channel, setChannel] = useState<Channel>("WhatsApp");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [scheduleType, setScheduleType] =
    useState<ScheduleType>("Now");
  const [scheduleDate, setScheduleDate] = useState<string>("");
  const [scheduleTime, setScheduleTime] = useState<string>("");
  const [audience, setAudience] = useState<string>("");

  const handleTemplateChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const templateId = e.target.value;
    setSelectedTemplate(templateId);

    const tpl = templates.find((t) => t.id === templateId);
    setMessage(tpl?.content || "");
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Create Campaign
          </h1>
          <p className="text-sm text-gray-500">
            Send WhatsApp or Email messages to your audience
          </p>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-50">
            Cancel
          </button>
          <button className="px-4 py-2 text-sm rounded-lg bg-black text-white hover:bg-gray-900">
            Launch Campaign
          </button>
        </div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side */}
        <div className="lg:col-span-2 space-y-6">
          {/* Campaign Details */}
          <div className="bg-white rounded-xl border shadow-sm p-6 space-y-5">
            <h2 className="font-medium text-gray-900">
              Campaign Details
            </h2>

            {/* Campaign Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Campaign Name
              </label>
              <input
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                type="text"
                placeholder="CHRS Webinar Reminder – Day 1"
                className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>

            {/* Channel */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Channel
              </label>
              <div className="flex gap-3">
                {(["WhatsApp", "Email"] as Channel[]).map((c) => (
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

            {/* Template */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Template
              </label>
              <select
                value={selectedTemplate}
                onChange={handleTemplateChange}
                className="w-full rounded-lg border px-3 py-2 text-sm"
              >
                <option value="">Select Template</option>
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Audience */}
          <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
            <h2 className="font-medium text-gray-900">
              Audience Selection
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {audiences.map((a) => (
                <label
                  key={a}
                  className="flex items-center gap-2 text-sm border rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="radio"
                    name="audience"
                    value={a}
                    checked={audience === a}
                    onChange={() => setAudience(a)}
                  />
                  {a}
                </label>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
            <h2 className="font-medium text-gray-900">Schedule</h2>

            <div className="flex gap-3">
              {(["Now", "Schedule"] as ScheduleType[]).map(
                (s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setScheduleType(s)}
                    className={`px-4 py-2 rounded-lg text-sm border ${
                      scheduleType === s
                        ? "bg-black text-white border-black"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {s}
                  </button>
                )
              )}
            </div>

            {scheduleType === "Schedule" && (
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  value={scheduleDate}
                  onChange={(e) =>
                    setScheduleDate(e.target.value)
                  }
                  className="rounded-lg border px-3 py-2 text-sm"
                />
                <input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) =>
                    setScheduleTime(e.target.value)
                  }
                  className="rounded-lg border px-3 py-2 text-sm"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Preview */}
        <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
          <h2 className="font-medium text-gray-900">
            Campaign Preview
          </h2>

          <div className="rounded-lg border bg-gray-50 p-4 text-sm whitespace-pre-wrap min-h-[180px]">
            {message || "Select a template to preview message"}
          </div>

          <div className="pt-3 border-t text-xs text-gray-600 space-y-1">
            <div>
              <strong>Channel:</strong> {channel}
            </div>
            <div>
              <strong>Audience:</strong>{" "}
              {audience || "Not selected"}
            </div>
            <div>
              <strong>Schedule:</strong>{" "}
              {scheduleType === "Now"
                ? "Send immediately"
                : `${scheduleDate || "--"} ${scheduleTime || ""}`}
            </div>
            <div>
              <strong>Status:</strong> Draft
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
