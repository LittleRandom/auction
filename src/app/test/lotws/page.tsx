"use client"
import { useSocket } from "@/hooks/use-websockets";
import { LotItem, Response } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Page() {
    const [data, setData] = useState<LotItem[]>([])
    const { socket, isConnected } = useSocket();
    useEffect(() => {

        socket.emit("lot:list", async (response: Response<LotItem[]>) => {
            if ('data' in response) {
                setData(response.data)
            } else {
                console.log("🚀 ~ socket.emit ~ response:", response)
            }
        });
    }, []);
    socket.on("lot:created", (response) => {
        console.log(response)
    })
    return (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
