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
export async function getInventoryStats() {
  const { data, error } = await supabase
    .from("products")
    .select("quantity, selling_price");

  if (error) {
    console.error(error);
    throw error;
  }

  const totalProducts = data.length;

  const totalQuantity = data.reduce(
    (sum, product) => sum + (product.quantity || 0),
    0
  );

  const inventoryValue = data.reduce(
    (sum, product) =>
      sum + (product.quantity || 0) * (product.selling_price || 0),
    0
  );

  const lowStock = data.filter(
    (product) => (product.quantity || 0) <= 5
  ).length;

  return {
    totalProducts,
    totalQuantity,
    inventoryValue,
    lowStock,
  };
}
export async function getAllProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, quantity")
    .order("name");

  if (error) throw error;

  return data;
}

export async function stockIn(
  productId: string,
  quantity: number
) {
  // Get current product
  const { data: product, error: fetchError } = await supabase
    .from("products")
    .select("quantity")
    .eq("id", productId)
    .single();

  if (fetchError) throw fetchError;

  // Update quantity
  const { error: updateError } = await supabase
    .from("products")
    .update({
      quantity: (product.quantity || 0) + quantity,
    })
    .eq("id", productId);

  if (updateError) throw updateError;

  // Save transaction
  const { error: transactionError } = await supabase
    .from("inventory_transactions")
    .insert({
      product_id: productId,
      transaction_type: "IN",
      quantity,
    });

  if (transactionError) throw transactionError;
}
export async function stockOut(
  productId: string,
  quantity: number
) {
  // Get current stock
  const { data: product, error: fetchError } = await supabase
    .from("products")
    .select("quantity")
    .eq("id", productId)
    .single();

  if (fetchError) throw fetchError;

  const currentStock = product.quantity || 0;

  if (currentStock < quantity) {
    throw new Error("Not enough stock available.");
  }

  // Update stock
  const { error: updateError } = await supabase
    .from("products")
    .update({
      quantity: currentStock - quantity,
    })
    .eq("id", productId);

  if (updateError) throw updateError;

  // Save transaction
  const { error: transactionError } = await supabase
    .from("inventory_transactions")
    .insert({
      product_id: productId,
      transaction_type: "OUT",
      quantity,
    });

  if (transactionError) throw transactionError;
}
export async function getInventoryTransactions() {
  const { data, error } = await supabase
    .from("inventory_transactions")
    .select(`
      id,
      transaction_type,
      quantity,
      created_at,
      products (
        name
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}