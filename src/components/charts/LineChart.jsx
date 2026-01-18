export default function LineChart({ labels, datasets }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="font-semibold mb-2">📊 Subject Statistics (mock)</p>

      <pre className="text-sm bg-gray-50 p-3 rounded overflow-auto">
        {JSON.stringify({ labels, datasets }, null, 2)}
      </pre>
    </div>
  );
}
