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
    .or(`receiver_id.eq.${currentUserId},sender_id.eq.${currentUserId}`);

  return { data, error };
};

export const subscribeToRequests = (userId, onChange) => {
  const channel = supabase
    .channel(`meet_requests_${userId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "meet_requests",
      },
      (payload) => {
        const request = payload.new;

        if (request.sender_id === userId || request.receiver_id === userId) {
          onChange(request);
        }
      },
    )
    .subscribe();

  return channel;
};

export const setMeetupStatus = async (meetupId, status) => {
  const { data, error } = await supabase
    .from("meet_requests")
    .update({ status: status })
    .eq("meet_id", meetupId)
    .select()
    .single();

  return { data, error };
};
