'use client'

import LotListingCard from "@/components/auction/lots/lot-listing-card";
import CountdownTimer from "@/components/timer";
import { useSocket } from "@/hooks/use-websockets";

export default function Page() {

    return (
        <div>
            <CountdownTimer></CountdownTimer>
        </div>
    )
}

