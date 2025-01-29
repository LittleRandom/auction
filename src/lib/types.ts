import { Tables } from "@/lib/supabase/database.types";

export interface EventItem extends Tables<'auction_events'>{}
export interface LotItem extends Tables<'auction_lots'>{}