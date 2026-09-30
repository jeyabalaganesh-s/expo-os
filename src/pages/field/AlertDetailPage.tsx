import { useParams, useNavigate } from "react-router-dom";

export default function AlertDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-blue-600"
      >
        ← Back to Alerts
      </button>

      <div className="bg-white rounded-xl shadow p-5 space-y-4">
        <h2 className="text-xl font-semibold text-red-600">
          Alert #{id}
        </h2>

        <div className="space-y-1 text-sm text-gray-700">
          <p><strong>Type:</strong> Critical</p>
          <p><strong>Location:</strong> Hall B</p>
          <p><strong>Issued By:</strong> Ops Control</p>
          <p><strong>Time:</strong> Today, 3:42 PM</p>
        </div>

        <div className="border-t pt-4">
          <p className="text-gray-800">
            Immediate evacuation drill in Hall B. All security and
            front desk staff must guide visitors calmly towards
            emergency exits.
          </p>
        </div>

        <button className="w-full bg-black text-white py-2 rounded-lg">
          Acknowledge Alert
        </button>
      </div>
    </div>
  );
}
