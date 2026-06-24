export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100">
      <header className="bg-blue-700 text-white p-5 shadow">
        <h1 className="text-3xl font-bold">💎 AIJewels Dashboard</h1>
      </header>

      <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold">📦 Inventory</h2>
          <p className="text-4xl mt-4 font-bold text-blue-600">0</p>
          <p className="text-gray-500">Products</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold">👥 Customers</h2>
          <p className="text-4xl mt-4 font-bold text-green-600">0</p>
          <p className="text-gray-500">Registered</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold">💰 Sales</h2>
          <p className="text-4xl mt-4 font-bold text-purple-600">₹0</p>
          <p className="text-gray-500">Today's Sales</p>
        </div>

      </div>
    </main>
  );
}