'use client'

import LotListingCard from "@/components/auction/lots/lot-listing-card";
import { LoadingSpinner } from "@/components/placeholders/loading-spinner";
import { useLots } from "@/hooks/use-lots";

export default function Page() {

    const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
            const domContentLoadedTime =
                entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart;
            console.log(
                `${entry.name}: DOMContentLoaded processing time: ${domContentLoadedTime}ms`,
            );
            const loadEventTime = entry.loadEventEnd - entry.loadEventStart;
            if (loadEventTime > 0) {
                console.log(`${entry.name}: load event handler time: ${loadEventTime}ms`);
            }
            console.log(`${entry.name}: domComplete time: ${entry.domComplete}ms`);

        });
    });

    observer.observe({ type: "navigation", buffered: true });


    return (
        <>
            <div className="col-start-2 col-span-4">
                <LotListingCard ></LotListingCard>
            </div>
        </>
    )
}

