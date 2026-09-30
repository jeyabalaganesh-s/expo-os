// src/pages/customer/QRPassPage.tsx

export default function QRPassPage() {
  return (
    <div className="space-y-6 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Your Entry Pass</h1>
        <p className="text-sm text-gray-500">
          Show this QR code at the event entrance
        </p>
      </div>

      {/* QR Card */}
      <div className="bg-white border rounded p-4 text-center">
        {/* QR Placeholder */}
        <div className="w-56 h-56 mx-auto bg-gray-100 flex items-center justify-center border rounded">
          <span className="text-gray-400 text-sm">QR CODE</span>
        </div>

        {/* Info */}
        <div className="mt-4 text-sm space-y-1">
          <div>
            <span className="text-gray-500">Company:</span>{" "}
            <strong>SpiceHub Pvt Ltd</strong>
          </div>
          <div>
            <span className="text-gray-500">Stall:</span> A12
          </div>
          <div>
            <span className="text-gray-500">Event:</span> SUKA Food Expo 2025
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <button className="flex-1 px-3 py-2 bg-orange-500 text-white rounded">
            Download QR
          </button>
          <button className="flex-1 px-3 py-2 border rounded">
            Print
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-gray-50 border rounded p-4 text-sm">
        <h3 className="font-semibold mb-2">Instructions</h3>
        <ul className="space-y-1 list-disc pl-4 text-gray-600">
          <li>Carry this QR pass on your phone or print it</li>
          <li>QR is required for entry and re-entry</li>
          <li>Each booking has a unique QR</li>
          <li>Do not share your QR with others</li>
        </ul>
      </div>
    </div>
  );
}
