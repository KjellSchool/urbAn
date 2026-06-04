import { supabase } from "./supabase";

export const getArchetypes = async () => {
  const { data, error } = await supabase.from("archetypes").select("*");

  return { data, error };
};

export const getArchetype = async (archetypeId) => {
  const { data, error } = await supabase
    .from("archetypes")
    .select("*")
    .eq("archetype_id", archetypeId)
    .single();

  return { data, error };
};
