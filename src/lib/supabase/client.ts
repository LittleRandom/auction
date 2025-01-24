import { createBrowserClient } from "@supabase/ssr";
import { useMemo } from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../database.types";

let client: SupabaseClient<Database> | undefined

export const createClient = () => {

  if (client) {
    return client
  }

  client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  return client
}

export const getUserData = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user
}