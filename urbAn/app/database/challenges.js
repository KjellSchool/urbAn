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
