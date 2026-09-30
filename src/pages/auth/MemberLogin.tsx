// src/pages/members/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, LogIn } from "lucide-react";
import api from "../../utils/api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/login", {
        email,
        password,
      });

      // assuming cookie-based auth
      navigate("/members/dashboard");
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Invalid login credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        {/* ================= BRAND ================= */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-orange-600">
            SUKA Circle
          </h1>
          <p className="text-gray-500 mt-1">
            Members Portal
          </p>
        </div>

        {/* ================= CARD ================= */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            Welcome back 👋
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Login to access your membership
          </p>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">
                Email
              </label>
              <div className="mt-1 flex items-center gap-2 border rounded-lg px-3">
                <Mail size={16} className="text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full py-2 outline-none text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">
                Password
              </label>
              <div className="mt-1 flex items-center gap-2 border rounded-lg px-3">
                <Lock size={16} className="text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full py-2 outline-none text-sm"
                />
              </div>
            </div>

            {/* Actions */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-orange-600 text-white text-sm hover:bg-orange-700 disabled:opacity-60"
            >
              <LogIn size={16} />
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-4 text-right">
            <button className="text-sm text-orange-600 hover:underline">
              Forgot password?
            </button>
          </div>
        </div>

        {/* ================= CTA ================= */}
        <div className="text-center text-sm text-gray-600">
          Not a member yet?{" "}
          <a
            href="/membership/apply"
            className="text-orange-600 font-medium hover:underline"
          >
            Apply for membership
          </a>
        </div>
      </div>
    </div>
  );
}
