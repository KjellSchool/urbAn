import { supabase } from "./supabase";

export const getTips = async () => {
  const { data, error } = await supabase.from("tips").select("*");

  return { data, error };
};

export const getTip = async (tipId) => {
  const { data, error } = await supabase
    .from("tips")
    .select("*")
    .eq("tip_id", tipId);

  return { data, error };
};

export const getChallengeTip = async (challengeId) => {
  const { data, error } = await supabase
    .from("tips")
    .select("*")
    .eq("challenge_id", challengeId)
    .single();

  return { data, error };
};
