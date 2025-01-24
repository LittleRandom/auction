'use client'
import CategoryList from "@/src/components/category-list";
import LotListing from "@/src/components/lots/lot-listings";
import { useEvents } from "@/src/hooks/use-events";

export default function Page() {
    const { data, isLoading } = useEvents({ isActive: true })
    if (isLoading) {
        return <p>Loading...</p>
    }
    return (
        <pre>{JSON.stringify(data, null, 2)}</pre>
    );
}