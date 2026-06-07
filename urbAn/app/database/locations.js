import { supabase } from "./supabase";

export const getLocations = async () => {
  const { data, error } = await supabase.from("locations").select("*");

  return { data, error };
};

export const getLocation = async (locationId) => {
  const { data, error } = await supabase
    .from("locations")
    .select("*")
    .eq("location_id", locationId)
    .single();

  return { data, error };
};
