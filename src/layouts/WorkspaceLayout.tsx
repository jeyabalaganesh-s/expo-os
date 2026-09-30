import { Outlet } from "react-router-dom";
import WorkspaceSidebar from "../components/workspace/WorkspaceSidebar";
import WorkspaceHeader from "../components/workspace/WorkspaceHeader";

export default function WorkspaceLayout() {
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <WorkspaceHeader />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        <WorkspaceSidebar />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
