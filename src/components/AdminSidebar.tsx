import { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { SIDEBAR_CONFIG } from "../config/sidebarConfig";
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

type Props = {
  role: string;
};

export default function AdminSidebar({ role }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const visibleGroups = SIDEBAR_CONFIG.filter((g) =>
    g.roles.includes(role)
  );

  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  /* ================= SET ACTIVE GROUP FROM URL ================= */
  useEffect(() => {
    if (!activeGroup && visibleGroups.length > 0) {
      const matchedGroup = visibleGroups.find((group) =>
        group.items.some((item) =>
          location.pathname.startsWith(item.path)
        )
      );

      setActiveGroup(
        matchedGroup?.key || visibleGroups[0].key
      );
    }
  }, [activeGroup, visibleGroups, location.pathname]);

  const handleGroupClick = (group: any) => {
    setActiveGroup(group.key);
    if (collapsed) setCollapsed(false);
    if (group.items?.length) {
      navigate(group.items[0].path);
    }
  };

  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/admin");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* ================= PRIMARY SIDEBAR ================= */}
      <aside className="w-16 bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center py-4 gap-4 shadow-lg">
        {/* BACK */}
        <button
          onClick={handleBack}
          className="p-2 rounded-lg hover:bg-white/10 transition"
          title="Go back"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="w-8 h-px bg-white/20 my-2" />

        {/* GROUP ICONS */}
        {visibleGroups.map((group) => {
          const Icon = group.icon;
          const isActive = activeGroup === group.key;

          return (
            <button
              key={group.key}
              onClick={() => handleGroupClick(group)}
              title={group.label}
              className={`relative p-2 rounded-xl transition-all ${
                isActive
                  ? "bg-orange-600 shadow-md"
                  : "hover:bg-white/10"
              }`}
            >
              <Icon size={20} />
              {isActive && (
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-orange-400 rounded-l" />
              )}
            </button>
          );
        })}
      </aside>

      {/* ================= SECONDARY SIDEBAR ================= */}
      <aside
        className={`relative transition-all duration-300 ${
          collapsed ? "w-0" : "w-64"
        }`}
      >
        {!collapsed && activeGroup && (
          <div className="h-full bg-white border-r shadow-sm flex flex-col">
            {/* HEADER */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h2 className="text-sm font-semibold text-gray-700">
                {
                  visibleGroups.find(
                    (g) => g.key === activeGroup
                  )?.label
                }
              </h2>

              <button
                onClick={() => setCollapsed(true)}
                className="p-1 rounded hover:bg-gray-100"
                title="Collapse"
              >
                <ChevronLeft size={18} />
              </button>
            </div>

            {/* MENU */}
            <nav className="flex-1 px-2 py-3 space-y-1">
              {visibleGroups
                .find((g) => g.key === activeGroup)
                ?.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 rounded-lg text-sm transition ${
                        isActive
                          ? "bg-orange-50 text-orange-700 font-medium border border-orange-200"
                          : "text-gray-600 hover:bg-gray-100"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
            </nav>
          </div>
        )}
      </aside>

      {/* ================= EXPAND BUTTON ================= */}
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="absolute left-16 top-4 bg-white border rounded-r-lg p-1 shadow hover:bg-gray-50 transition"
          title="Expand menu"
        >
          <ChevronRight size={18} />
        </button>
      )}
    </div>
  );
}
