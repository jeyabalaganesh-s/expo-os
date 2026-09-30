import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { EVENT_SIDEBAR_CONFIG } from "../../config/eventSidebarConfig";
import type { EventPhase } from "../../config/eventSidebarConfig";

/* ================= UTILS ================= */

function getEventSlugFromSubdomain(): string | null {
  const host = window.location.hostname;
  const parts = host.split(".");
  return parts.length > 2 ? parts[0] : null;
}

export default function WorkspaceSidebar() {
  const [phase, setPhase] = useState<EventPhase | null>(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH EVENT ================= */

  useEffect(() => {
    const slug = getEventSlugFromSubdomain();

    if (!slug) {
      console.error("Event slug not found in subdomain");
      setLoading(false);
      return;
    }

    const fetchEventPhase = async () => {
      try {
        const res = await api.get(`/event/public/${slug}`);
        setPhase(res.data.phase);
      } catch (err) {
        console.error("Failed to load event phase", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventPhase();
  }, []);

  /* ================= STATES ================= */

  if (loading) {
    return (
      <aside className="w-64 bg-white border-r p-4 text-sm text-gray-400">
        Loading workspace…
      </aside>
    );
  }

  if (!phase || !EVENT_SIDEBAR_CONFIG[phase]) {
    return (
      <aside className="w-64 bg-white border-r p-4 text-sm text-red-500">
        Invalid or missing event phase
      </aside>
    );
  }

  /* ================= UI ================= */

  return (
    <aside className="w-64 bg-white border-r overflow-y-auto">
      <div className="p-4 space-y-6">
        {EVENT_SIDEBAR_CONFIG[phase].map((group) => (
          <div key={group.section}>
            <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">
              {group.section}
            </h3>

            <nav className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition ${
                        isActive
                          ? "bg-orange-100 text-orange-700 font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                  >
                    <Icon size={16} />
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}
