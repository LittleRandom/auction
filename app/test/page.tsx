// Example usage in a page component (app/page.tsx)
'use client'

import { createClient } from '@/utils/supabase/client'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

interface Todo {
    id: number
    title: string
    completed: boolean
}

async function fetchTodos() {
    const supabase = createClient()
    const { data } = await supabase.from('auctionlots').select('*')

    return data
}

export default function TodoList() {
    const { data, isLoading } = useQuery({
        queryKey: ['lots'],
        queryFn: fetchTodos,
    })

    if (isLoading) return <div>Loading...</div>

    return <pre>{JSON.stringify(data, null, 2)}</pre>
}