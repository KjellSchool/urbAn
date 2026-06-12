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

export const insertProfile = async (
  username,
  birthday,
  description,
  archetype,
) => {
  const { data, error } = await supabase
    .from("profiles")
    .insert([
      {
        name: username,
        description: description,
        date_of_birth: birthday,
        primary_archetype: archetype,
      },
    ])
    .select()
    .single();

  return { data, error };
};

export const setProfileLocation = async (profileId, userLocation) => {
  console.log(profileId);
  console.log(userLocation);

  const { data, error } = await supabase
    .from("profiles")
    .update({ coordinates: userLocation })
    .eq("profile_id", profileId)
    .select()
    .single();

  return { data, error };
};
