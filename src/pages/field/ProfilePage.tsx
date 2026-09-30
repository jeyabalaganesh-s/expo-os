import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();

  // Later replace with real user data
  const user = {
    name: "Ramesh Kumar",
    role: "Security",
    phone: "+91 98765 43210",
    staffId: "SEC-042",
    assignedZone: "Gate 2",
    shift: "2:00 PM – 10:00 PM",
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">My Profile</h2>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow p-5 space-y-3">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold">
            {user.name.charAt(0)}
          </div>

          <div>
            <h3 className="font-medium text-lg">{user.name}</h3>
            <p className="text-sm text-gray-600">{user.role}</p>
          </div>
        </div>

        <div className="text-sm text-gray-700 space-y-1">
          <p><strong>Staff ID:</strong> {user.staffId}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Assigned Zone:</strong> {user.assignedZone}</p>
          <p><strong>Shift:</strong> {user.shift}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-xl shadow p-5 space-y-3">
        <button
          onClick={() => alert("Support will contact you")}
          className="w-full border py-2 rounded-lg"
        >
          Contact Support
        </button>

        <button
          onClick={() => navigate("/logout")}
          className="w-full bg-red-600 text-white py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
