import { Outlet, NavLink } from "react-router-dom";

export default function ConferenceLayout() {
  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm flex flex-col">
        <div className="p-5 border-b">
          <h2 className="text-lg font-semibold">Conference</h2>
          <p className="text-xs text-gray-500">Hall & Session Management</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 text-sm">
          <NavLink to="/conference/halls" className={navClass}>Halls</NavLink>
          <NavLink to="/conference/sessions" className={navClass}>Sessions</NavLink>
          <NavLink to="/conference/speakers" className={navClass}>Speakers</NavLink>
          <NavLink to="/conference/schedule" className={navClass}>Schedule</NavLink>
          <NavLink to="/conference/registrations" className={navClass}>Registrations</NavLink>
        </nav>

        <div className="p-4 border-t text-xs text-gray-500">
          SUKA ExpoOS
        </div>
      </aside>

      {/* Content */}
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
