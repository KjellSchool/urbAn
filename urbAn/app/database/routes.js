import { supabase } from "./supabase";

export const getRoutes = async () => {
  const { data, error } = await supabase.from("routes").select("*");

  return { data, error };
};

export const getRoute = async (routeId) => {
  const { data, error } = await supabase
    .from("routes")
    .select("*")
    .eq("route_id", routeId);

  return { data, error };
};
