"use client"
import { Button } from "@/components/ui/button";
import { useSocket } from "@/hooks/use-websockets";

export default function Home() {
    const socket = useSocket()
    return (
        <div>
            <form>
                <Button>Send</Button>
            </form>
        </div>
    );
}