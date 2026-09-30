import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  function handleForgot(e: React.FormEvent) {
    e.preventDefault();
    alert("Password reset link sent (mock)");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleForgot}
        className="bg-white p-6 rounded shadow w-full max-w-sm space-y-4"
      >
        <h1 className="text-xl font-semibold text-center">Forgot Password</h1>

        <input
          type="email"
          placeholder="Enter your email"
          className="border w-full px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded"
        >
          Send reset link
        </button>

        <div className="text-center text-sm">
          <Link to="/auth/login" className="underline">
            Back to login
          </Link>
        </div>
      </form>
    </div>
  );
}
