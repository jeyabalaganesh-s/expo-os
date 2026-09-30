import React from "react";

type Breadcrumb = {
  label: string;
  href?: string;
};

type PageAction = {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
  icon?: React.ReactNode;
};

type Props = {
  title: string;
  description?: string;

  breadcrumbs?: Breadcrumb[];
  actions?: PageAction[];
  tabs?: React.ReactNode;
  meta?: React.ReactNode;

  children?: React.ReactNode;
};

export default function PageShell({
  title,
  description,
  breadcrumbs,
  actions,
  tabs,
  meta,
  children,
}: Props) {
  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b">
        <div className="px-6 py-4 space-y-3">
          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="text-xs text-gray-400 flex items-center gap-1">
              {breadcrumbs.map((b, i) => (
                <span key={i} className="flex items-center gap-1">
                  {b.href ? (
                    <a
                      href={b.href}
                      className="hover:text-gray-600 transition"
                    >
                      {b.label}
                    </a>
                  ) : (
                    <span className="text-gray-700 font-medium">
                      {b.label}
                    </span>
                  )}
                  {i < breadcrumbs.length - 1 && (
                    <span className="opacity-40">›</span>
                  )}
                </span>
              ))}
            </nav>
          )}

          {/* Title + Actions */}
          <div className="flex justify-between items-start gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                {title}
              </h1>
              {description && (
                <p className="text-sm text-gray-500 mt-1 max-w-2xl">
                  {description}
                </p>
              )}
            </div>

            {actions && actions.length > 0 && (
              <div className="flex items-center gap-2">
                {actions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={action.onClick}
                    className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition ${
                      action.variant === "danger"
                        ? "bg-red-50 text-red-700 hover:bg-red-100"
                        : action.variant === "secondary"
                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        : "bg-orange-600 text-white hover:bg-orange-700 shadow-sm"
                    }`}
                  >
                    {action.icon}
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tabs */}
          {tabs && (
            <div className="pt-2">{tabs}</div>
          )}
        </div>
      </div>

      {/* ================= META ================= */}
      {meta && (
        <div className="bg-white rounded-xl border shadow-sm px-6 py-4">
          {meta}
        </div>
      )}

      {/* ================= CONTENT ================= */}
      <div className="bg-white rounded-2xl border shadow-sm ring-1 ring-gray-100 p-6">
        {children ? (
          children
        ) : (
          <div className="text-sm text-gray-400 text-center py-16">
            No content available yet.
          </div>
        )}
      </div>
    </div>
  );
}
