"use client"
import { useSupabase } from "@/hooks/use-supabase";
import { Tables } from "@/lib/supabase/database.types";
import { LotItem } from "@/lib/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";


export function useLots() : UseQueryResult<LotItem[], Error> {
    const supabase = useSupabase();
    return useQuery({
        queryKey: ['lots'],
        queryFn: async () => {
            const { data, error } = await supabase
            .from("auction_lots")
            .select("*")
            .order('id')

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
