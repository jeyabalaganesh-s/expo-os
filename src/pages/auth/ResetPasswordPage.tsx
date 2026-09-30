import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  function handleReset(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }
    alert("Password reset successful (mock)");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleReset}
        className="bg-white p-6 rounded shadow w-full max-w-sm space-y-4"
      >
        <h1 className="text-xl font-semibold text-center">Reset Password</h1>

        <input
          type="password"
          placeholder="New password"
          className="border w-full px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm password"
          className="border w-full px-3 py-2 rounded"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded"
        >
          Reset password
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
