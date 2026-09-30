import { useEventContext } from "../../hooks/useEventContext";

export default function WorkspaceHeader() {
  const { slug } = useEventContext();

  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-6">
      <div>
        <h1 className="text-sm font-semibold text-gray-800">
          Event Workspace
        </h1>
        <p className="text-xs text-gray-500">
          {slug}.event.sukacircle.com
        </p>
      </div>

      <div className="text-sm text-gray-600">
        Admin
      </div>
    </header>
  );
}
