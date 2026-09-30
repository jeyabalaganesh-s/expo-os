// src/pages/NotFoundPage.tsx
import { Link } from "react-router-dom";
import { Home, ArrowLeft, AlertTriangle } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-orange-50 px-6">
      <div className="max-w-md text-center">
        {/* Icon */}
        <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-orange-100 text-orange-600">
          <AlertTriangle size={40} />
        </div>

        {/* Title */}
        <h1 className="mt-6 text-5xl font-bold text-gray-900">
          404
        </h1>

        {/* Subtitle */}
        <p className="mt-3 text-lg font-semibold text-gray-800">
          Page Not Found
        </p>

        {/* Description */}
        <p className="mt-2 text-sm text-gray-600">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-orange-600 text-white text-sm font-medium hover:bg-orange-700"
          >
            <Home size={16} />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-md border text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
