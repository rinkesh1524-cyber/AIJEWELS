import { notFound } from "next/navigation";
import ProductForm from "../../components/ProductForm";
import { getProductById } from "@/lib/products";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Edit Product</h1>

      <ProductForm
        mode="edit"
        initialData={{
          id: product.id,
          name: product.name,
          category: product.category ?? "",
          metal: product.metal ?? "",
          purity: product.purity ?? "",
          quantity: product.quantity ?? 0,
          gross_weight: product.gross_weight ?? 0,
          net_weight: product.net_weight ?? 0,
          purchase_price: product.purchase_price ?? 0,
          making_charges: product.making_charges ?? 0,
          selling_price: product.selling_price ?? 0,
        }}
      />
    </div>
  );
}