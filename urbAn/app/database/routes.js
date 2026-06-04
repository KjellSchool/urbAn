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

export const getCompletedRoutesForUser = async (userId) => {
  const { data, error } = await supabase
    .from("route_progress")
    .select(
      `
      route_progress_id,
      created_at,
      route_id,
      completed,
      routes (*)
    `,
    )
    .eq("profile_id", userId)
    .eq("completed", true);

  return { data, error };
};