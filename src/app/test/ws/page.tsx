"use client"
import { Button } from "@/components/ui/button";
import { useSocket } from "@/hooks/use-websockets";
import { FormEvent, useState } from 'react';

export default function Home() {
    const [items, setItems] = useState({});

    const socket = useSocket()

    socket.on("values", (values) => { setItems(values) })

    const clickButton = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        socket.emit("readAll", (response: object) => {
            setItems(response);
        })
    }
    return (
        <div>
            <form onSubmit={clickButton}>
                <Button>Send</Button>
            </form>
            <pre>{JSON.stringify(items, null, 2)}</pre>
        </div>
    );
}