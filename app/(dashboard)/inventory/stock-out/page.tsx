import { getAllProducts } from "@/lib/products";
import StockOutForm from "../components/StockOutForm";
export default async function StockOutPage() {
  const products = await getAllProducts();

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">
        📤 Stock Out
      </h1>

      <StockOutForm products={products} />
    </div>
  );
}