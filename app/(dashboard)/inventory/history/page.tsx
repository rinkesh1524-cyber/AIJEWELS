import { getInventoryTransactions } from "@/lib/products";

export default async function TransactionHistoryPage() {
  const transactions = await getInventoryTransactions();

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">
        📜 Inventory Transaction History
      </h1>

      <div className="overflow-hidden rounded-xl bg-white shadow">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Quantity</th>
            </tr>
          </thead>

          <tbody>
            {transactions?.map((transaction: any) => (
              <tr
                key={transaction.id}
                className="border-t"
              >
                <td className="p-4">
                  {new Date(
                    transaction.created_at
                  ).toLocaleString()}
                </td>

                <td className="p-4">
                  {transaction.products?.name}
                </td>

                <td className="p-4">
                  {transaction.transaction_type === "IN" ? (
                    <span className="font-semibold text-green-600">
                      📥 IN
                    </span>
                  ) : (
                    <span className="font-semibold text-red-600">
                      📤 OUT
                    </span>
                  )}
                </td>

                <td className="p-4">
                  {transaction.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}