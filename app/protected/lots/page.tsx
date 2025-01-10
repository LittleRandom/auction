'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function Page() {
    const [notes, setNotes] = useState<any[] | null>(null)
    const supabase = createClient()

    useEffect(() => {
        const getData = async () => {

            // let { data: auctionlots, error } = await supabase.from('auctionlots').select('id')

            const { data } = await supabase.from('auctionlots').select('*')
            setNotes(data)
        }
        getData()
    }, [])

    return <pre>{JSON.stringify(notes, null, 2)}</pre>
}