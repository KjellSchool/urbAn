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
  avatar,
  username,
  description,
  birthday,
  gender,
  country,
  archetype,
) => {
  const { data, error } = await supabase
    .from("profiles")
    .insert([
      {
        avatar: avatar,
        name: username,
        description: description,
        date_of_birth: birthday,
        gender: gender,
        nationality: country,
        primary_archetype: archetype,
      },
    ])
    .select()
    .single();

  return { data, error };
};

export const updateProfile = async (
  profileId,
  freshUser
) => {
  const { data, error } = await supabase
    .from("profiles")
    .update({
      avatar: freshUser.avatar,
      name: freshUser.name,
      description: freshUser.description,
      date_of_birth: freshUser.dob,
      gender: freshUser.gender,
      nationality: freshUser.nationality,
      is_visible: freshUser.is_visible,
    })
    .eq("profile_id", profileId)
    .select("*")
    .single();

  return { data, error };
};

export const setProfileLocation = async (profileId, userLocation) => {
  const { data, error } = await supabase
    .from("profiles")
    .update({ coordinates: userLocation })
    .eq("profile_id", profileId)
    .select()
    .single();

  return { data, error };
};

export const getProfileLocation = async (profileId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("coordinates")
    .eq("profile_id", profileId)
    .single();

  return { data, error };
};
