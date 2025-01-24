// File: hooks/use-supabase.ts
import { useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import type { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/database.types";

export function useSupabase(): SupabaseClient<Database> {
  return useMemo(() => createClient(), []);
}