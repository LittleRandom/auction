import { useSupabase } from "@/hooks/use-supabase";
import { LotItem } from "@/lib/types";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { useState } from "react";

export function useLotsChannel() : {} | LotItem | undefined {

    const [data, setData] = useState<{} | LotItem | undefined>();
    const supabase = useSupabase();
    const channelA = supabase
    .channel('schema-db-changes')
    .on(
        'postgres_changes',
        {
            event: '*',
            schema: 'public',
            table: 'auction_lots',
        },
        (payload) => {
            setData(payload.new)

            // const toChange = () => ({id}: {id:number}) => id == payload.old.id;
            // items.findIndex(toChange)
            // const index = items.findIndex(obj => obj.id === payload.old.id);
            // replaceObjectById(items, payload.old.id, payload.new)

        }
    )
    .subscribe()

    return data
}
