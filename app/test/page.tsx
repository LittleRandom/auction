// Example usage in a page component (app/page.tsx)
'use client'
import { CountdownTimer } from '@/components/auction/lots/countdown-timer';
import { DatePickerWithPresets } from '@/components/calendar-picker-presets';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { setDate } from 'date-fns'
import { useEffect, useRef, useState } from 'react'

export default function Page() {
    const [date, setDate] = useState<Date>();

    const handleButtonClick = () => {
        console.log("🚀 ~ Page ~ date:", date)

    }
    return (
        <div>

            <CountdownTimer></CountdownTimer>
            <Button onClick={handleButtonClick}>Log</Button>
            <DatePickerWithPresets onDateChange={setDate}></DatePickerWithPresets>
        </div>
    )
}

export type EventFormData = {
    end_date: string | null
    created_at: string
    is_active: boolean
}

function Counter() {
    const myBtn = useRef(null);
    const emailRef = useRef<HTMLInputElement>(null);


    const clickIt = () => {
        const formData: EventFormData = {
            // const formData: Tables<'auction_events'> = {
            created_at: Date(),
            end_date: emailRef.current?.value!,
            is_active: false
        }

        // formData.end_date = emailRef.current?.value!
        console.log("🚀 ~ clickIt ~ formData:", formData)
    }

    return (
        <div>
            <Input
                id="email"
                ref={emailRef}>
            </Input>
            <Button ref={myBtn} onClick={clickIt}>myBtn</Button>
        </div>
    )
}