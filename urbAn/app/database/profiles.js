import { supabase } from "./supabase";

export const getProfiles = async () => {
  const { data, error } = await supabase.from("profiles").select("*");

  return { data, error };
};

export const getProfile = async (profileId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", profileId);

  return { data, error };
};
