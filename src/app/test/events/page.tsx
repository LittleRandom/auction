'use client'

import { LoadingSpinner } from '@/components/placeholders/loading-spinner'
import { useEvents } from '@/hooks/use-events'

export default function Page() {
    const { data, isPending } = useEvents()
    if (isPending) return <LoadingSpinner />
    return <pre>{JSON.stringify(data, null, 2)}</pre>
}