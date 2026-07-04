import { supabase } from "./supabase";

export interface Customer {
  name: string;
  phone: string;
  email?: string;
  address?: string;
  gst_number?: string;
  notes?: string;
}

export async function createCustomer(customer: Customer) {
  const { data, error } = await supabase
    .from("customers")
    .insert([customer])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export async function getCustomers() {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export async function getCustomerById(id: string) {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function updateCustomer(id: string, customer: Customer) {
  const { data, error } = await supabase
    .from("customers")
    .update(customer)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteCustomer(id: string) {
  const { error } = await supabase
    .from("customers")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
export async function getCustomer(id: string) {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

