import { createBrowserClient } from "@supabase/ssr";
import { TypedSupabaseClient } from "@/utils/types";
import { useMemo } from "react";

let client: TypedSupabaseClient | undefined

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

export function useSupabaseBrowser() {
  return useMemo(createClient, [])
}

export const getUserData = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user
}