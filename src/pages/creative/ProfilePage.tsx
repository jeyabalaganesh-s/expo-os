export default function CreativeProfilePage() {
  const user = {
    name: "Arun Kumar",
    role: "Designer",
    department: "Creative & Production",
    phone: "+91 9XXXX XXXXX",
    email: "arun@sukaexpo.com",
    skills: ["Photoshop", "Illustrator", "Branding", "Standee Design"],
    activeTasks: 4,
    completedTasks: 28,
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold">
          {user.name.charAt(0)}
        </div>

        <div>
          <h1 className="text-xl font-semibold">{user.name}</h1>
          <p className="text-sm text-gray-600">
            {user.role} • {user.department}
          </p>
        </div>
      </div>

      {/* Profile Details */}
      <div className="bg-white border rounded-lg p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <Detail label="Role" value={user.role} />
        <Detail label="Department" value={user.department} />
        <Detail label="Phone" value={user.phone} />
        <Detail label="Email" value={user.email} />
      </div>

      {/* Skills */}
      <div className="bg-white border rounded-lg p-5">
        <h2 className="font-medium mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {user.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 text-xs rounded-full bg-gray-100 border"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Work Summary */}
      <div className="grid grid-cols-2 gap-4">
        <Stat label="Active Tasks" value={user.activeTasks} />
        <Stat label="Completed Tasks" value={user.completedTasks} />
      </div>

      {/* Actions */}
      <div className="bg-white border rounded-lg p-5 space-y-3">
        <button className="w-full border py-2 rounded-md">
          Edit Profile
        </button>
        <button className="w-full bg-red-600 text-white py-2 rounded-md">
          Logout
        </button>
      </div>
    </div>
  );
}

/* -----------------------
   Helpers
------------------------*/

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white border rounded-lg p-4 text-center">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
