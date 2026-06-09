import { supabase } from "./supabase";

export const getProfiles = async () => {
  const { data, error } = await supabase.from("profiles").select("*");

  return { data, error };
};

export const getProfile = async (profileId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("profile_id", profileId)
    .single();

  return { data, error };
};

export const setLocation = async (profileId, userLocation) => {
  const { data, error } = await supabase
    .from("profiles")
    .update({ user_location: userLocation })
    .eq("profile_id", profileId)
    .select();

  return { data, error };
};
