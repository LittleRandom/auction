'use client'

import { createClient } from '@/src/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function Page() {
    const [notes, setNotes] = useState<any[] | null>(null)
    const supabase = createClient()

    useEffect(() => {
        const getData = async () => {

            // let { data: auction_lots, error } = await supabase.from('auction_lots').select('id')

            const { data } = await supabase.from('auction_lots').select('*')
            setNotes(data)
        }
        getData()
    }, [])

    return <pre>{JSON.stringify(notes, null, 2)}</pre>
}