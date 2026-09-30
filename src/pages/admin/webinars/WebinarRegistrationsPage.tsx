import {
  Eye,
  Mail,
  MessageSquare,
  CheckCircle,
  XCircle,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../../utils/api";
import { Link } from "react-router-dom";
import EmailCampaignModal from "../../../components/campaigns/EmailCampaignModal";

/* ================= UTIL ================= */

const generateId = () =>
  Math.random().toString(36).substring(2, 11);

/* ================= TYPES ================= */

type RegistrationStatus =
  | "Registered"
  | "Attended"
  | "No Show"
  | "Cancelled";

type Registration = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  webinar: string;
  registeredOn: string;
  status: RegistrationStatus;
};

type FilterField =
  | "name"
  | "email"
  | "mobile"
  | "webinar"
  | "status";

type FilterOperator =
  | "contains"
  | "equals"
  | "startsWith";

type FilterRule = {
  id: string;
  field: FilterField;
  operator: FilterOperator;
  value: string;
};

/* ================= STATUS STYLES ================= */

const statusStyle: Record<RegistrationStatus, string> = {
  Registered: "bg-blue-100 text-blue-700",
  Attended: "bg-green-100 text-green-700",
  "No Show": "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
};

/* ================= FILTER ENGINE ================= */

const applyFilters = (
  data: Registration[],
  rules: FilterRule[]
) => {
  if (!rules.length) return data;

  return data.filter((item) =>
    rules.every((rule) => {
      const fieldValue = String(
        item[rule.field] ?? ""
      ).toLowerCase();

      const ruleValue = rule.value.toLowerCase();
      if (!ruleValue) return true;

      switch (rule.operator) {
        case "contains":
          return fieldValue.includes(ruleValue);
        case "equals":
          return fieldValue === ruleValue;
        case "startsWith":
          return fieldValue.startsWith(ruleValue);
        default:
          return true;
      }
    })
  );
};

/* ================= FILTER SIDEBAR ================= */

function FilterSidebar({
  rules,
  setRules,
}: {
  rules: FilterRule[];
  setRules: React.Dispatch<
    React.SetStateAction<FilterRule[]>
  >;
}) {
  const addRule = () => {
    setRules((prev) => [
      ...prev,
      {
        id: generateId(),
        field: "webinar",
        operator: "contains",
        value: "",
      },
    ]);
  };

  const updateRule = (
    id: string,
    key: keyof FilterRule,
    value: any
  ) => {
    setRules((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, [key]: value } : r
      )
    );
  };

  const removeRule = (id: string) => {
    setRules((prev) =>
      prev.filter((r) => r.id !== id)
    );
  };

  return (
    <div className="w-72 bg-white border rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">
          Filters
        </h3>
        {rules.length > 0 && (
          <button
            onClick={() => setRules([])}
            className="text-xs text-gray-500 hover:text-red-600"
          >
            Clear all
          </button>
        )}
      </div>

      {rules.map((rule) => (
        <div
          key={rule.id}
          className="space-y-2 border rounded-lg p-3"
        >
          <select
            value={rule.field}
            onChange={(e) =>
              updateRule(
                rule.id,
                "field",
                e.target.value
              )
            }
            className="w-full border rounded px-2 py-1 text-sm"
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="mobile">Mobile</option>
            <option value="webinar">Webinar</option>
            <option value="status">Status</option>
          </select>

          <select
            value={rule.operator}
            onChange={(e) =>
              updateRule(
                rule.id,
                "operator",
                e.target.value
              )
            }
            className="w-full border rounded px-2 py-1 text-sm"
          >
            <option value="contains">contains</option>
            <option value="equals">equals</option>
            <option value="startsWith">
              starts with
            </option>
          </select>

          <div className="flex gap-2">
            <input
              value={rule.value}
              onChange={(e) =>
                updateRule(
                  rule.id,
                  "value",
                  e.target.value
                )
              }
              placeholder="value"
              className="flex-1 border rounded px-2 py-1 text-sm"
            />
            <button
              onClick={() => removeRule(rule.id)}
              className="text-gray-400 hover:text-red-600"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={addRule}
        className="text-sm text-blue-600 hover:underline"
      >
        + Add rule
      </button>
    </div>
  );
}

/* ================= MAIN PAGE ================= */

export default function WebinarRegistrationsPage() {
  const [registrations, setRegistrations] =
    useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  const [rules, setRules] = useState<FilterRule[]>([]);
  const [showFilters, setShowFilters] = useState(true);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showCampaignModal, setShowCampaignModal] =
    useState(false);

  /* ===== PAGINATION ===== */
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  /* ================= FETCH ================= */

  useEffect(() => {
    api
      .get("/admin/webinar-registrations")
      .then((res) => setRegistrations(res.data))
      .catch(() =>
        alert("Failed to load registrations")
      )
      .finally(() => setLoading(false));
  }, []);

  /* ================= FILTER + PAGINATION ================= */

  const filtered = applyFilters(
    registrations,
    rules
  );

  const totalPages = Math.ceil(
    filtered.length / pageSize
  );

  const paginated = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  useEffect(() => {
    setPage(1);
  }, [rules, pageSize]);

  /* ================= SELECTION ================= */

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const ids = paginated.map((r) => r.id);
    const allSelected = ids.every((id) =>
      selectedIds.includes(id)
    );

    setSelectedIds(
      allSelected
        ? selectedIds.filter(
            (id) => !ids.includes(id)
          )
        : [...new Set([...selectedIds, ...ids])]
    );
  };

  if (loading) return <div className="p-6">Loading…</div>;

  return (
    <div className="flex gap-6 items-start">
      {showFilters && (
        <FilterSidebar rules={rules} setRules={setRules} />
      )}

      {showCampaignModal && (
        <EmailCampaignModal
          isOpen
          recipients={selectedIds}
          source="webinar-registrations"
          onClose={() => setShowCampaignModal(false)}
        />
      )}

      <div className="flex-1 space-y-4">
        {/* HEADER */}
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">
            Webinar Registrations
          </h1>

          <div className="flex gap-2">
            <button
              onClick={() =>
                setShowFilters((v) => !v)
              }
              className="px-3 py-1 border rounded text-sm"
            >
              {showFilters
                ? "Hide Filters"
                : "Show Filters"}
            </button>

            <button
              disabled={!selectedIds.length}
              onClick={() =>
                setShowCampaignModal(true)
              }
              className="px-4 py-1.5 bg-orange-600 text-white rounded text-sm disabled:opacity-50"
            >
              Send Email ({selectedIds.length})
            </button>
          </div>
        </div>

        {/* TOP PAGINATION */}
        <div className="flex justify-between items-center bg-white border rounded-lg px-4 py-3 text-sm">
          <div className="text-gray-600">
            Showing {(page - 1) * pageSize + 1}–
            {Math.min(page * pageSize, filtered.length)}{" "}
            of {filtered.length}
          </div>

          <div className="flex items-center gap-2">
            Rows:
            <select
              value={pageSize}
              onChange={(e) =>
                setPageSize(Number(e.target.value))
              }
              className="border rounded px-2 py-1"
            >
              {[10, 25, 50, 100].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">
                  <input
                    type="checkbox"
                    onChange={toggleSelectAll}
                    checked={
                      paginated.length > 0 &&
                      paginated.every((r) =>
                        selectedIds.includes(r.id)
                      )
                    }
                  />
                </th>
                <th className="p-3 text-left">
                  Participant
                </th>
                <th className="p-3 text-left">
                  Webinar
                </th>
                <th className="p-3 text-left">
                  Registered On
                </th>
                <th className="p-3 text-left">
                  Status
                </th>
                <th className="p-3 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {paginated.map((reg) => (
                <tr key={reg.id} className="border-b">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(
                        reg.id
                      )}
                      onChange={() =>
                        toggleSelect(reg.id)
                      }
                    />
                  </td>

                  <td className="p-3">
                    <div className="font-medium">
                      {reg.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {reg.email} • {reg.mobile}
                    </div>
                  </td>

                  <td className="p-3">
                    {reg.webinar}
                  </td>

                  <td className="p-3">
                    {new Date(
                      reg.registeredOn
                    ).toDateString()}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${statusStyle[reg.status]}`}
                    >
                      {reg.status}
                    </span>
                  </td>

                  <td className="p-3 text-right">
                    <div className="inline-flex gap-2">
                      {reg.status ===
                        "Registered" && (
                        <>
                          <button
                            onClick={() =>
                              api.patch(
                                `/admin/webinar-registrations/${reg.id}/status`,
                                { status: "Attended" }
                              )
                            }
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button
                            onClick={() =>
                              api.patch(
                                `/admin/webinar-registrations/${reg.id}/status`,
                                { status: "No Show" }
                              )
                            }
                          >
                            <XCircle size={16} />
                          </button>
                        </>
                      )}

                      <Link
                        to={`/admin/webinar-registrations/${reg.id}`}
                      >
                        <Eye size={16} />
                      </Link>

                      <Link
                        to={`/admin/webinar-registrations/${reg.id}/email`}
                      >
                        <Mail size={16} />
                      </Link>

                      <Link
                        to={`/admin/webinar-registrations/${reg.id}/whatsapp`}
                      >
                        <MessageSquare size={16} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}

              {paginated.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-6 text-center text-gray-500"
                  >
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* BOTTOM PAGINATION */}
        <div className="flex justify-end gap-2 text-sm">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map(
            (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 border rounded ${
                  page === i + 1
                    ? "bg-orange-600 text-white"
                    : ""
                }`}
              >
                {i + 1}
              </button>
            )
          )}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
