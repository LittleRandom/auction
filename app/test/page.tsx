// Example usage in a page component (app/page.tsx)
'use client'

import { CountdownTimer } from '@/src/components/lots/countdown-timer'
import { useLots } from '@/src/hooks/use-lots'
import { useQuery } from '@tanstack/react-query'

export default function Page() {
    return (
        <CountdownTimer></CountdownTimer>
    )
}