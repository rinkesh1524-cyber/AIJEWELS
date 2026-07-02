"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/lib/products";

interface Product {
  id: string;
  name: string;
  category: string | null;
  metal: string | null;
  purity: string | null;
  quantity: number;
  selling_price: number;
}

interface ProductTableProps {
  products: Product[];
}

export default function ProductTable({ products }: ProductTableProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    const term = search.toLowerCase();

    return products.filter((product) =>
      product.name.toLowerCase().includes(term) ||
      (product.category ?? "").toLowerCase().includes(term) ||
      (product.metal ?? "").toLowerCase().includes(term) ||
      (product.purity ?? "").toLowerCase().includes(term)
    );
  }, [products, search]);

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteProduct(id);
      alert("✅ Product deleted successfully!");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("❌ Failed to delete product.");
    }
  }

  return (
    <div className="rounded-xl bg-white shadow">

      <div className="border-b p-4">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border px-4 py-2"
        />
      </div>

      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Metal</th>
            <th className="p-4 text-left">Purity</th>
            <th className="p-4 text-left">Qty</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan={7} className="p-8 text-center text-gray-500">
                No products found.
              </td>
            </tr>
          ) : (
            filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4">{product.metal}</td>
                <td className="p-4">{product.purity}</td>
                <td className="p-4">{product.quantity}</td>
                <td className="p-4">₹{product.selling_price}</td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/products/${product.id}/edit`}
                      className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(product.id)}
                      className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

    </div>
  );
}