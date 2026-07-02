import { supabase } from "./supabase";

export interface Product {
  organization_id?: string | null;
  name: string;
  sku?: string;
  barcode?: string;
  category?: string;
  metal?: string;
  purity?: string;
  gross_weight?: number;
  net_weight?: number;
  quantity?: number;
  unit?: string;
  purchase_price?: number;
  making_charges?: number;
  selling_price?: number;
  image_urls?: string[];
  ai_description?: string;
  ai_tags?: string[];
  status?: string;
}

export async function createProduct(product: Product) {
  const sku = product.sku || `AIJ-${Date.now()}`;

  const { data, error } = await supabase
    .from("products")
    .insert([
      {
        ...product,
        sku,
        organization_id: product.organization_id ?? null,
        quantity: product.quantity ?? 0,
        unit: product.unit ?? "Piece",
        status: product.status ?? "Active",
      },
    ])
    .select()
    .single();

  if (error) {
    console.log("Message:", error.message);
    console.log("Details:", error.details);
    console.log("Hint:", error.hint);
    console.log("Code:", error.code);
    console.log("Full error:", error);

    throw error;
  }

  return data;
}
export async function getProductById(id: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}
export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}
export async function deleteProduct(id: string) {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}
export async function updateProduct(
  id: string,
  product: Partial<Product>
) {
  const { data, error } = await supabase
    .from("products")
    .update(product)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}