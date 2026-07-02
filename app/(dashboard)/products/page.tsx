import Link from "next/link";
import { getProducts } from "@/lib/products";
import ProductTable from "./components/ProductTable";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Products
        </h1>

        <Link
          href="/products/add"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          + Add Product
        </Link>
      </div>

      <ProductTable products={products ?? []} />
    </div>
  );
}