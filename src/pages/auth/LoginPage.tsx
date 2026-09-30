import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../utils/api";

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const inviteToken = searchParams.get("invite");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // store token
      localStorage.setItem("access_token", res.data.token);

      // if invite token exists, redirect to accept invite
      if (inviteToken) {
        navigate(`/invite/${inviteToken}`);
      } else {
        navigate("/admin");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Invalid credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white border rounded-xl p-6 space-y-6">
        {/* LOGO */}
        <div className="text-center">
          <h1 className="text-xl font-semibold">
            Sign in to SUKA Circle
          </h1>
          <p className="text-sm text-gray-500">
            Manage your events and team
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-50 text-red-700 text-sm p-3 rounded">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs text-gray-500">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white py-2 rounded text-sm hover:bg-orange-700 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* LINKS */}
        <div className="text-center text-xs text-gray-500">
          <a
            href="/forgot-password"
            className="hover:text-orange-600"
          >
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
}
