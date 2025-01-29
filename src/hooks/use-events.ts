import { dataTagSymbol, useQuery } from "@tanstack/react-query";
import { useSupabase } from "@/hooks/use-supabase";
import { Tables } from "@/lib/database.types";

export interface EventItem extends Tables<'auction_events'>{}

export function useEvents(options?: { isActive?: Boolean }) {
    const supabase = useSupabase();
    return useQuery({
        queryKey: ['lots'],
        queryFn: async () => {

            let data, error;

            if(options?.isActive){
                ({ data, error } = await supabase
                .from("auction_events")
                .select("*")
                .eq("is_active", true)
                );
            } else {
                ({ data, error } = await supabase
                .from("auction_events")
                .select("*")
                );
            }
            if(error) throw error
            if (!data) throw new Error("Data not found");
            return data
        }
    })
}