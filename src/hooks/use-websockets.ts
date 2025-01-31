// hooks/useWebSocket.ts
import { TimerMessage } from '@/lib/types';
import { useState, useEffect, useCallback, useRef } from 'react';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3000/api/websocket';

export function useWebSocket() {
  const [endDateTime, setEndDateTime] = useState<number | null>(null);
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<number>(2);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  const connect = useCallback(() => {
    try {
      ws.current = new WebSocket(WS_URL);

      ws.current.onopen = () => {
        console.log('WebSocket connected');
        reconnectAttempts.current = 0;
      };

      ws.current.onmessage = (event) => {
        try {
          const data: TimerMessage = JSON.parse(event.data);
          console.log("🚀 ~ connect ~ event.data:", event.data)
          if (data.type === 'update' && data.end_datetime) {
            setEndDateTime(new Date(data.end_datetime).getTime());
          }
        } catch (error) {
          console.log('Error parsing message:', error);
        }
      };

      ws.current.onclose = () => {
        console.log('WebSocket disconnected');
        if (reconnectAttempts.current < maxReconnectAttempts) {
          const timeout = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 10000);
          reconnectTimeout.current = window.setTimeout(() => {
            reconnectAttempts.current++;
            connect();
          }, timeout);
        }
      };

      ws.current.onerror = (error) => {
        console.log('WebSocket error:', error);
      };

    } catch (error) {
      console.log('Error creating WebSocket:', error);
    }
  }, []);

  const extendTime = useCallback((seconds: number) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      const message: TimerMessage = {
        type: 'extend',
        extension: seconds
      };
      ws.current.send(JSON.stringify(message));
    }
  }, []);

  useEffect(() => {
    connect();
    return () => {
      if (ws.current) {
        console.log("🚀 ~ return CLOSE CLOSE ~ ws.current:", ws.current)

        ws.current.close();
      }
      if (reconnectTimeout.current) {
        window.clearTimeout(reconnectTimeout.current);
      }
    };
  }, [connect]);

  return { endDateTime, extendTime };
}