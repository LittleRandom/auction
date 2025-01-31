import { Tables } from "@/lib/supabase/database.types";

export interface EventItem extends Tables<'auction_events'>{}
export interface LotItem extends Tables<'auction_lots'>{}

// types/countdown.ts
export interface TimeLeft {
    hours: number;
    minutes: number;
    seconds: number;
  }

  export interface TimerResponse {
    end_datetime: string;
  }

  export interface TimerMessage {
    type: 'extend' | 'update';
    end_datetime?: string;
    extension?: number;
  }