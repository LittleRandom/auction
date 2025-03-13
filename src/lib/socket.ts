"use client";

import { io } from "socket.io-client";

// export const socket = io();
export const socket = io('http://localhost:3001', {
    reconnectionAttempts: 5,
    timeout: 10000,
    // transports: ['websocket', 'polling']
});
