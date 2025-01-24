import { dataTagSymbol, useQuery } from "@tanstack/react-query";
import { useSupabase } from "@/hooks/use-supabase";

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