'use client'
import { Button } from '@/components/ui/button';
import { useSocket } from '@/hooks/use-websockets';
// import { socket } from "@/lib/socket";
// import { useSocket } from '@/hooks/use-websockets';
import React, { MouseEvent, useState, useEffect, useRef } from 'react';

interface TimerState {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
}

interface ServerTimeData {
    endTime: number;    // Unix timestamp in milliseconds
    currentTime: number; // Unix timestamp in milliseconds
}

const CountdownTimer = () => {
    // State to store timer values
    const [timeLeft, setTimeLeft] = useState<TimerState>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
    });


    // Refs to store data and manage intervals
    const { socket, isConnected } = useSocket()
    const timerRef = useRef<number | null>(null);
    const serverTimeDataRef = useRef<ServerTimeData | null>(null);
    const clientTimeOffsetRef = useRef<number>(0);

    useEffect(() => {
        // Listen for time data from server
        socket.on('time:timeData', (data: ServerTimeData) => {
            try {
                if (data.endTime && data.currentTime) {
                    // Calculate client-server time offset when we receive data
                    const clientTime = Date.now();
                    clientTimeOffsetRef.current = clientTime - data.currentTime;

                    // Store the server time data
                    serverTimeDataRef.current = data;

                    // Start the countdown timer
                    startCountdown();
                }
            } catch (error) {
                console.error('Error processing time data:', error);
            }
        });

    }, []);

    const startCountdown = () => {
        // Clear any existing interval
        if (timerRef.current) {
            window.clearInterval(timerRef.current);
        }

        // Update the timer every 10ms for millisecond accuracy
        timerRef.current = window.setInterval(() => {
            if (!serverTimeDataRef.current) return;

            // Calculate current time based on server time + elapsed client time
            const clientNow = Date.now();
            const adjustedCurrentTime = clientNow - clientTimeOffsetRef.current;

            // Calculate time remaining
            const timeRemaining = serverTimeDataRef.current.endTime - adjustedCurrentTime;

            // If countdown finished
            if (timeRemaining <= 0) {
                setTimeLeft({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                    milliseconds: 0,
                });

                // Notify server that countdown completed (optional)
                socket?.emit('countdownComplete');

                if (timerRef.current) {
                    window.clearInterval(timerRef.current);
                    timerRef.current = null;
                }
                return;
            }

            // Calculate time units
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
            const milliseconds = Math.floor(timeRemaining % 1000);

            setTimeLeft({
                days,
                hours,
                minutes,
                seconds,
                milliseconds,
            });
        }, 25); // Update every 10ms for smooth millisecond display
    };

    // Request a time sync from server (can be called periodically to maintain accuracy)
    const syncWithServer = () => {
        socket.emit("time:timeButton", (response: object) => {
        });
    };

    // Format numbers with leading zeros
    const formatNumber = (num: number, digits: number): string => {
        return num.toString().padStart(digits, '0');
    };

    return (
        <div className="countdown-timer">
            <div className="connection-status">
                Status: {isConnected ? "Connected" : "Connecting..."}
            </div>

            <div className="timer-display">
                {timeLeft.days > 0 && (
                    <span className="timer-unit">
                        {formatNumber(timeLeft.days, 2)}d
                    </span>
                )}
                <span className="timer-unit">{formatNumber(timeLeft.hours, 2)}h</span>
                <span className="timer-unit">{formatNumber(timeLeft.minutes, 2)}m</span>
                <span className="timer-unit">{formatNumber(timeLeft.seconds, 2)}s</span>
                <span className="timer-unit">{formatNumber(timeLeft.milliseconds, 3)}ms</span>
            </div>

            <div>
                <Button onClick={syncWithServer}>
                    Sync with server
                </Button>
            </div>
        </div>
    );
};

export default CountdownTimer;