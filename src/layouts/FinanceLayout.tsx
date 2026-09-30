import { Outlet, NavLink } from "react-router-dom";

export default function FinanceLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-4">
        <h2 className="font-semibold mb-6">Finance</h2>
        <nav className="space-y-3 text-sm">
          <NavLink to="/finance">Dashboard</NavLink>
          <NavLink to="/finance/invoices">Invoices</NavLink>
          <NavLink to="/finance/payments">Payments</NavLink>
          <NavLink to="/finance/reports">Reports</NavLink>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
