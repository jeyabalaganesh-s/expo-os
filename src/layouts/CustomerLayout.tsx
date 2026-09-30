import { Outlet, NavLink } from "react-router-dom";
import {
  Home,
  CalendarCheck,
  Store,
  CreditCard,
  HelpCircle,
  User,
} from "lucide-react";

/**
 * CustomerLayout
 *
 * Customers mostly access ExpoOS on mobile devices.
 * To improve usability, speed, and one-hand navigation,
 * we use a mobile-first layout with icon-only bottom navigation.
 *
 * Benefits:
 * - Thumb-friendly navigation
 * - Faster access to key actions
 * - Clean UI with reduced visual clutter
 * - Familiar mobile app experience
 */
export default function CustomerLayout() {
  const navItems = [
    { to: "/customer", icon: Home },           // Dashboard
    { to: "/customer/booking", icon: CalendarCheck }, // My Bookings
    { to: "/customer/stall", icon: Store },    // My Stall
    { to: "/customer/payments", icon: CreditCard }, // Payments
    { to: "/customer/support", icon: HelpCircle }, // Support
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b px-4 py-3 flex justify-between items-center">
        <h1 className="text-lg font-semibold">SUKA ExpoOS</h1>

        {/* Profile kept in header for quick access */}
        <NavLink
          to="/customer/profile"
          className="text-gray-600 hover:text-black"
        >
          <User size={20} />
        </NavLink>
      </header>

      {/* Main content
         pb-20 ensures content is not hidden behind bottom navigation */}
      <main className="flex-1 p-4 pb-20">
        <Outlet />
      </main>

      {/* Bottom Navigation
         Fixed at bottom for mobile usability */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-sm">
        <div className="flex justify-around items-center h-14">
          {navItems.map(({ to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                `p-2 rounded-full transition ${
                  isActive
                    ? "text-black bg-gray-100"
                    : "text-gray-500 hover:text-black"
                }`
              }
            >
              <Icon size={22} />
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
