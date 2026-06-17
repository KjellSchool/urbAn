import { supabase } from "./supabase";

export const getChallenges = async () => {
  const { data, error } = await supabase.from("challenges").select("*");

  return { data, error };
};

export const getChallenge = async (challengeId) => {
  const { data, error } = await supabase
    .from("challenges")
    .select("*")
    .eq("challenge_id", challengeId)
    .single();

  return { data, error };
};

export const getCompletedChallenges = async (profileId) => {
  const { data, error } = await supabase
    .from("challenge_progress")
    .select("*")
    .eq("profile_id", profileId)
    .eq("completed", "TRUE");

  return { data, error };
};

export const insertChallengeProgres = async (challengeId, profileId) => {
  const { data, error } = await supabase
    .from("challenge_progress")
    .upsert(
      {
        profile_id: profileId,
        challenge_id: challengeId,
        completed: true,
      },
      {
        onConflict: "profile_id,challenge_id",
      },
    )
    .select()
    .single();

  return { data, error };
};

export const getChallengeProgress = async (challengeId, profileId) => {
  const { data, error } = await supabase
    .from("challenge_progress")
    .select("*")
    .eq("challenge_id", challengeId)
    .eq("profile_id", profileId)
    .single();

  return { data, error };
};
