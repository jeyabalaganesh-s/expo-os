import { Outlet, NavLink } from "react-router-dom";

export default function FieldLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Top Bar */}
      <header className="bg-gradient-to-r from-gray-900 to-black text-white px-4 py-3 flex justify-between items-center shadow">
        <div>
          <h1 className="font-semibold text-base leading-tight">
            SUKA ExpoOS
          </h1>
          <p className="text-xs text-gray-300">
            Field Operations
          </p>
        </div>

        {/* Status dot */}
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-400"></span>
          <span className="text-xs text-gray-300">Online</span>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-4 pb-20">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-sm">
        <div className="flex justify-around items-center h-14 text-xs">
          
          <NavLink
            to="/field"
            end
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${
                isActive
                  ? "text-black font-medium"
                  : "text-gray-500"
              }`
            }
          >
            <span className="text-lg">📋</span>
            Tasks
          </NavLink>

          <NavLink
            to="/field/alerts"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${
                isActive
                  ? "text-red-600 font-medium"
                  : "text-gray-500"
              }`
            }
          >
            <span className="text-lg">🚨</span>
            Alerts
          </NavLink>

          <NavLink
            to="/field/profile"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${
                isActive
                  ? "text-black font-medium"
                  : "text-gray-500"
              }`
            }
          >
            <span className="text-lg">👤</span>
            Profile
          </NavLink>

        </div>
      </nav>
    </div>
  );
}
