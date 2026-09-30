import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Calendar,
  BookOpen,
  Users,
  CreditCard,
  Settings,
} from "lucide-react";

const menu = [
  { name: "Dashboard", path: "/members/dashboard", icon: LayoutDashboard },
  { name: "My Profile", path: "/members/profile", icon: User },
  { name: "Events", path: "/members/events", icon: Calendar },
  { name: "Resources", path: "/members/resources", icon: BookOpen },
  { name: "Community", path: "/members/community", icon: Users },
  { name: "Membership", path: "/members/membership", icon: CreditCard },
  { name: "Settings", path: "/members/settings", icon: Settings },
];

export default function MemberSidebar() {
  return (
    <aside className="w-64 bg-white border-r hidden md:flex flex-col">
      <div className="h-16 flex items-center px-6 font-bold text-orange-600 text-lg">
        SUKA Circle
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menu.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-sm
              ${
                isActive
                  ? "bg-orange-50 text-orange-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <Icon size={18} />
            {name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
