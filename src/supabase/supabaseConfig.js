import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://rqzlvehrakbrqapsjngq.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_c6Xz1Yr73zFQ__Y7jLV44w_vMwNQALs";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);