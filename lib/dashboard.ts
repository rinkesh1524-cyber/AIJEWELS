import { supabase } from "./supabase";

export async function getDashboardStats() {
  const [{ count: products }, { count: customers }] = await Promise.all([
    supabase
      .from("products")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("users")
      .select("*", { count: "exact", head: true }),
  ]);

  return {
    products: products ?? 0,
    customers: customers ?? 0,
    sales: 0, // We'll replace this when we build the Sales module
  };
}