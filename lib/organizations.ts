import { supabase } from "./supabase";

export async function createOrganization(data: {
  name: string;
  business_type: string;
  email: string;
  phone?: string;
}) {
  return await supabase
    .from("organizations")
    .insert([
      {
        name: data.name,
        business_type: data.business_type,
        email: data.email,
        phone: data.phone,
      },
    ])
    .select()
    .single();
}