'use client'

import { LoadingSpinner } from '@/components/placeholders/loading-spinner'
import { useLots } from '@/hooks/use-lots'

export default function Page() {
    const { data, isPending } = useLots()
    console.log("🚀 ~ Page ~ data:", data)
    if (isPending) return <LoadingSpinner />
    return <pre>{JSON.stringify(data, null, 2)}</pre>
}