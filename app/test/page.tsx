// Example usage in a page component (app/page.tsx)
'use client'

import { fetchTodos } from '@/queries/auctionlots'
import { createClient } from '@/utils/supabase/client'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export default function Page() {
    const { data, isLoading } = useQuery({
        queryKey: ['lots'],
        queryFn: fetchTodos,
    })

    if (isLoading) return <div>Loading...</div>

    return <pre>{JSON.stringify(data, null, 2)}</pre>
}