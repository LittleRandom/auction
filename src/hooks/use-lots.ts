"use client"
import { useSupabase } from "@/hooks/use-supabase";
import { Tables } from "@/lib/supabase/database.types";
import { useQuery } from "@tanstack/react-query";


export function useLots() {
    const supabase = useSupabase();
    return useQuery({
        queryKey: ['lots'],
        queryFn: async () => {
            const { data, error } = await supabase
            .from("auction_lots")
            .select("*")

            if(error) throw error
            if (!data) throw new Error("Data not found");
            return data
        }
    })
}

export function useLotItems(id: string) {
    const supabase = useSupabase();
    return useQuery({
        queryKey: ['lotItems'],
        staleTime: Infinity,
        queryFn: async () => {
            const { data, error } = await supabase
            .from("auction_lots")
            .select("*")
            .eq('id', id)
            .single()

            // if(error) throw error
            // if (!data) throw new Error("Data not found");

            return data
        }
    })
}
