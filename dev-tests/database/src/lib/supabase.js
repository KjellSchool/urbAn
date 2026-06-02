import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ttbxdsfaocdhixlekbbg.supabase.co";
const supabaseKey = "sb_publishable_FpfOVBjvqI5ag8SAvPba_w_JVLS0wBi";

export const supabase = createClient(
    supabaseUrl,
    supabaseKey
);