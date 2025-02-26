// app/api/timer/route.ts
import { NextResponse } from 'next/server';

let endDateTime = new Date();
endDateTime.setHours(endDateTime.getHours() + 1); // Default 1 hour from now

export async function GET() {
    const responseStream = new TransformStream();
    const writer = responseStream.writable.getWriter();
    const encoder = new TextEncoder();

    // Store the current client's writer in a global map
    const clientId = crypto.randomUUID();
    clients.set(clientId, writer);

    const headers = {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    };

    // Send initial timer state
    const initialData = JSON.stringify({ end_datetime: endDateTime.toISOString() });
    writer.write(encoder.encode(`data: ${initialData}\n\n`));

    return new NextResponse(responseStream.readable, { headers });
}

export async function POST(request: Request) {
    const body = await request.json();
    const extensionSeconds = body.extension || 30;

    // Update the end datetime
    endDateTime = new Date(endDateTime.getTime() + extensionSeconds * 1000);

    // Broadcast to all clients
    const data = JSON.stringify({ end_datetime: endDateTime.toISOString() });
    for (const writer of clients.values()) {
        const encoder = new TextEncoder();
        writer.write(encoder.encode(`data: ${data}\n\n`));
    }

    return NextResponse.json({ end_datetime: endDateTime.toISOString() });
}

// Store active client connections
const clients = new Map<string, WritableStreamDefaultWriter>();

// Cleanup function to remove disconnected clients
export function removeClient(clientId: string) {
    const writer = clients.get(clientId);
    if (writer) {
        writer.close();
        clients.delete(clientId);
    }
}