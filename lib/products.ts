import { supabase } from "./supabase";

export interface Product {
  organization_id: string;
  name: string;
  sku: string;
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
  const { data, error } = await supabase
    .from("products")
    .insert([product])
    .select();

  if (error) throw error;

  return data;
}