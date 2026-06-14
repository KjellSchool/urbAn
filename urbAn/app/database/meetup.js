import { supabase } from "./supabase";

export const sendRequest = async (senderId, receiverId) => {
  const { data: existing, error: checkError } = await supabase
    .from("meet_requests")
    .select("*")
    .eq("sender_id", senderId)
    .eq("receiver_id", receiverId)
    .eq("status", "pending");

  if (existing?.length > 0) {
    console.log("request already sent");
    return { data: null, error: checkError };
  }

  const { data, error } = await supabase
    .from("meet_requests")
    .insert({
      sender_id: senderId,
      receiver_id: receiverId,
    })
    .select()
    .single();

  console.log("request sent");

  return { data, error };
};

export const getPendingRequests = async (currentUserId) => {
  const { data, error } = await supabase
    .from("meet_requests")
    .select("*")
    .eq("receiver_id", currentUserId)
    .eq("status", "pending");

  return { data, error };
};

export const subscribeToRequests = (receiverId, onInsert) => {
  const channel = supabase
    .channel("meet_requests")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "meet_requests",
        filter: `receiver_id=eq.${receiverId}`,
      },
      (payload) => {
        onInsert(payload.new);
      },
    )
    .subscribe();

  return channel;
};
