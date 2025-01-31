'use client'
import LotListingLineCard from "@/components/auction/lots/lot-listing-line-card";
import { Card, CardContent } from "@/components/ui/card";
import { useLots } from "@/hooks/use-lots";
import { useLotsChannel } from "@/hooks/use-lots-realtime";
import { useSupabase } from "@/hooks/use-supabase";
import { LotItem } from "@/lib/types";
import { useEffect, useRef, useState } from "react";

export default function Page() {
    const { data, isPending } = useLots();
    const someData = useLotsChannel();
    const [syncedData, setSyncedData] = useState<LotItem[] | undefined>(data);

    useEffect(() => {
        // Initialize with data when it first loads
        if (data && !syncedData) {
            setSyncedData(data);
        }
    }, [data]);

    useEffect(() => {
        // Only proceed if someData is a LotItem (not empty object or undefined)
        if (someData && 'id' in someData && syncedData) {
            setSyncedData(currentData =>
                currentData?.map(item =>
                    item.id === someData.id ? someData : item
                )
            );
        }
    }, [someData]);

    if (isPending) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Card>

                <CardContent>
                    <div className="space-y-4">
                        {syncedData?.map((item) => (
                            <LotListingLineCard key={item.id} item={item}></LotListingLineCard>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

