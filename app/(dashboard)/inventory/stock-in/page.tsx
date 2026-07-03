import { getAllProducts } from "@/lib/products";
import StockInForm from "../components/StockInForm";

export default async function StockInPage() {
  const products = await getAllProducts();

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">
        📥 Stock In
      </h1>

      <StockInForm products={products} />
    </div>
  );
}