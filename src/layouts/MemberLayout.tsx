// src/layouts/MemberLayout.tsx
import { Outlet } from "react-router-dom";
import MemberSidebar from "../components/members/MemberSidebar";
import MemberTopbar from "../components/members/MemberTopbar";

export default function MemberLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <MemberSidebar />

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        <MemberTopbar />

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
