import { supabase } from "./supabase";

export const getChallenges = async () => {
  const { data, error } = await supabase.from("challenges").select("*");

  return { data, error };
};

export const getChallenge = async (challengeId) => {
  const { data, error } = await supabase
    .from("challenges")
    .select("*")
    .eq("challenge_id", challengeId);

  return { data, error };
};
