import { Outlet, NavLink } from "react-router-dom";

export default function CreativeLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm flex flex-col">
        <div className="p-5 border-b">
          <h2 className="text-lg font-semibold">Creative & Production</h2>
          <p className="text-xs text-gray-500">
            Design • Print • Fabrication
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1 text-sm">
          <NavLink to="/creative" end className={navClass}>
            My Work
          </NavLink>
          <NavLink to="/creative/tasks" className={navClass}>
            Assigned Tasks
          </NavLink>
          <NavLink to="/creative/uploads" className={navClass}>
            Uploads
          </NavLink>
          <NavLink to="/creative/approvals" className={navClass}>
            Approvals
          </NavLink>
          <NavLink to="/creative/profile" className={navClass}>
            Profile
          </NavLink>
        </nav>

        <div className="p-4 border-t text-xs text-gray-500">
          SUKA ExpoOS
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

const navClass = ({ isActive }: any) =>
  `block px-3 py-2 rounded-md transition ${
    isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
  }`;
