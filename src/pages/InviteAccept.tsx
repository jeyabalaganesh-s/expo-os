import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "../utils/api";

export default function InviteAccept() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const acceptInvite = async () => {
      try {
        await api.post(`/invites/${token}/accept`);
        navigate("/workspace");
      } catch {
        alert("Invite expired or invalid");
      }
    };

    acceptInvite();
  }, [token, navigate]);

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-sm text-gray-600">Accepting invitation…</p>
    </div>
  );
}
