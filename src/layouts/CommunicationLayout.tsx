import { Outlet, NavLink } from "react-router-dom";

export default function CommunicationLayout() {
  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm flex flex-col">
        <div className="p-5 border-b">
          <h2 className="text-lg font-semibold">Communication</h2>
          <p className="text-xs text-gray-500 mt-1">
            Campaigns & Messaging
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1 text-sm">
          <NavLink
            to="/communications"
            end
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md transition ${
                isActive
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            Campaigns
          </NavLink>

          <NavLink
            to="/communications/templates"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md transition ${
                isActive
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            Templates
          </NavLink>

          <NavLink
            to="/communications/logs"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md transition ${
                isActive
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            Message Logs
          </NavLink>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t text-xs text-gray-500">
          SUKA ExpoOS
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
}
