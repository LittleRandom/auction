"use client"
import { useSupabase } from "@/hooks/use-supabase";
import { useQuery } from "@tanstack/react-query";

export type LotItem = {
    id: number;
    name: string;
    current_bid: number;
    msrp: number;
    condition: string;
    cf_bucket_url: string;
    bid_count: number;
};

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
        queryFn: async () => {
            const { data, error } = await supabase
            .from("auction_lots")
            .select("*")
            .eq('id', id)
            .single()
            console.log("🚀 ~ queryFn: ~ data:", data)
            console.log("🚀 ~ queryFn: ~ error:", error)

            if(error) throw error
            if (!data) throw new Error("Data not found");

            return data
        }
    })
}