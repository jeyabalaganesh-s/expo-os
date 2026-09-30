import { Bell } from "lucide-react";

export default function MemberTopbar() {
  return (
    <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
      <h1 className="text-lg font-semibold text-gray-800">
        Member Portal
      </h1>

      <div className="flex items-center gap-4">
        <button className="relative">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full" />
        </button>

        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm text-gray-700 hidden sm:block">
            Member
          </span>
        </div>
      </div>
    </header>
  );
}
