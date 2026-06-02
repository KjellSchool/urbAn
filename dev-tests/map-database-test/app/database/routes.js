import { supabase } from "./supabase";

export async function getRoutes() {
  const { data, error } = await supabase.from("routes_test").select("*");

  return { data, error };
}
