export default function QRPassPage() {
  return (
    <div className="max-w-xl mx-auto p-6 text-center space-y-4">
      <h1 className="text-2xl font-semibold">Your Entry Pass</h1>

      <div className="bg-white border rounded p-6">
        <div className="w-40 h-40 mx-auto bg-gray-200 flex items-center justify-center">
          QR CODE
        </div>

        <div className="mt-3 text-sm text-gray-500">
          Show this QR at entry
        </div>
      </div>

      <button className="px-4 py-2 border rounded">
        Download Pass
      </button>
    </div>
  );
}
