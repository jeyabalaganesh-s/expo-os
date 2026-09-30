// src/components/layout/AdminLayout.tsx
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout() {
  const userRole = "SUPER_ADMIN"; // 🔐 get from auth context

  return (
    <div className="flex">
      <AdminSidebar role={userRole} />
      <main className="flex-1 h-[100vh] p-10 bg-gray-50 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
