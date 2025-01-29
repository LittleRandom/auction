'use client'

import { useEvents } from "@/hooks/use-events";

export default function Page() {
    const { data, isLoading } = useEvents({ isActive: true })
    if (isLoading) {
        return <p>Loading...</p>
    }
    return (
        <pre>{JSON.stringify(data, null, 2)}</pre>
    );
}