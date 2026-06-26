export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">📦 Inventory</h1>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg">
          + Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="py-3">Product</th>
              <th>Category</th>
              <th>Weight</th>
              <th>Stock</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="py-4">Silver Ring</td>
              <td>Ring</td>
              <td>12 g</td>
              <td>15</td>
              <td>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  In Stock
                </span>
              </td>
            </tr>

            <tr>
              <td className="py-4">Silver Chain</td>
              <td>Chain</td>
              <td>45 g</td>
              <td>8</td>
              <td>
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                  Low Stock
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}