import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../utils/api";

export default function ViewRegistrationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get(`/admin/webinar-registrations/${id}`);
      setData(res.data);
    };
    fetch();
  }, [id]);

  if (!data) return <div className="p-6">Loading…</div>;

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-semibold">Registration Details</h1>

      <div className="bg-white border rounded-xl p-6 space-y-2">
        <p><strong>Name:</strong> {data.name}</p>
        <p><strong>Email:</strong> {data.email}</p>
        <p><strong>Mobile:</strong> {data.mobile}</p>
        <p><strong>Webinar:</strong> {data.webinar}</p>
        <p><strong>Status:</strong> {data.status}</p>
        <p><strong>Registered On:</strong> {new Date(data.registeredOn).toLocaleString()}</p>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="border px-4 py-2 rounded"
      >
        Back
      </button>
    </div>
  );
}
