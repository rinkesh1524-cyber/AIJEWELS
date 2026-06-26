import { supabase } from "./supabase";

export async function createUser(data: {
  id: string;
  organization_id: string;
  full_name: string;
  role: string;
}) {
  return await supabase
    .from("users")
    .insert([
      {
        id: data.id,
        organization_id: data.organization_id,
        full_name: data.full_name,
        role: data.role,
      },
    ]);
}