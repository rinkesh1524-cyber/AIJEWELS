"use client";

import { useState } from "react";
import { stockOut } from "@/lib/products";

interface Product {
  id: string;
  name: string;
  quantity: number;
}

export default function StockOutForm({
  products,
}: {
  products: Product[];
}) {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!productId) {
      alert("Please select a product.");
      return;
    }

    if (quantity <= 0) {
      alert("Quantity must be greater than zero.");
      return;
    }

    try {
      setLoading(true);

      await stockOut(productId, quantity);

      alert("✅ Stock removed successfully!");

      location.reload();
    } catch (error: any) {
      console.error(error);

      alert(error.message || "❌ Failed to remove stock.");
    } finally {
      setLoading(false);
    }
  }

  const selectedProduct = products.find(
    (p) => p.id === productId
  );

  return (
    <div className="max-w-xl rounded-xl bg-white p-6 shadow">

      <label className="mb-2 block font-medium">
        Product
      </label>

      <select
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        className="mb-6 w-full rounded-lg border p-3"
      >
        <option value="">Select Product</option>

        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>

      {selectedProduct && (
        <p className="mb-6 text-lg">
          Current Stock:
          <strong> {selectedProduct.quantity}</strong>
        </p>
      )}

      <label className="mb-2 block font-medium">
        Remove Quantity
      </label>

      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="mb-6 w-full rounded-lg border p-3"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="rounded-lg bg-red-600 px-6 py-3 text-white hover:bg-red-700"
      >
        {loading ? "Saving..." : "Stock Out"}
      </button>

    </div>
  );
}