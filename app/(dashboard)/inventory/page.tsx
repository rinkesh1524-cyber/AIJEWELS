import { getInventoryStats } from "@/lib/products";

export default async function InventoryPage() {
  const stats = await getInventoryStats();

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Inventory Dashboard
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-gray-500">📦 Total Products</h2>
          <p className="mt-2 text-3xl font-bold">
            {stats.totalProducts}
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-gray-500">📊 Total Quantity</h2>
          <p className="mt-2 text-3xl font-bold">
            {stats.totalQuantity}
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-gray-500">💰 Inventory Value</h2>
          <p className="mt-2 text-3xl font-bold">
            ₹{stats.inventoryValue.toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-gray-500">⚠️ Low Stock</h2>
          <p className="mt-2 text-3xl font-bold text-red-600">
            {stats.lowStock}
          </p>
        </div>

      </div>
    </div>
  );
}