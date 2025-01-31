// pages/api/websocket.ts
import { Server } from 'ws';
import { NextApiRequest } from 'next';
import { TimerMessage } from '@/lib/types';

let endDateTime = new Date();
endDateTime.setHours(endDateTime.getHours() + 1); // Default 1 hour from now

const wss = new Server({ noServer: true });

wss.on('connection', (ws) => {
  // Send initial timer state
  ws.send(JSON.stringify({
    type: 'update',
    end_datetime: endDateTime.toISOString()
  }));

  ws.on('message', (message: string) => {
    try {
      const data: TimerMessage = JSON.parse(message);

      if (data.type === 'extend' && data.extension) {
        // Update the end datetime
        endDateTime = new Date(endDateTime.getTime() + data.extension * 1000);

        // Broadcast to all clients
        const broadcastMessage: TimerMessage = {
          type: 'update',
          end_datetime: endDateTime.toISOString()
        };

        wss.clients.forEach((client) => {
          if (client.readyState === ws.OPEN) {
            client.send(JSON.stringify(broadcastMessage));
          }
        });
      }
    } catch (error) {
      console.log('Error processing message:', error);
    }
  });

  ws.on("error", (stream) => {
    console.log('someone connected!');
  })
});

export default function handler(req: NextApiRequest, res: any) {
  console.log("🚀 ~ handler ~ req:", req)
  if (!res.socket.server.ws) {
    res.socket.server.ws = true;
    res.socket.server.on('upgrade', (request: any, socket: any, head: any) => {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    });
  }
  res.end();
}