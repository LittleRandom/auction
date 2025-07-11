import { createClient } from "@supabase/supabase-js";

export const useSupabase = async () => {
  return await createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!
  );
};