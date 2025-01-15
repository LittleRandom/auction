import { createClient } from "@/utils/supabase/client"

interface Todo {
    id: number
    title: string
    completed: boolean
}

export async function fetchTodos() {
    const supabase = await createClient()
    const { data } = await supabase.from('auctionlots').select('*')

    return data
}