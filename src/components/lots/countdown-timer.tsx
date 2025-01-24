'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export const CountdownTimer = () => {
    const [timeRemaining, setTimeRemaining] = useState(3600); // 1 hour default
    const [isFlickering, setIsFlickering] = useState(false);

    useEffect(() => {
        // Simulated Server-Sent Events (SSE) connection
        const eventSource = new EventSource('/api/countdown');

        eventSource.onmessage = (event) => {
            const newTime = parseInt(event.data, 10);

            // Trigger flicker effect
            setIsFlickering(true);
            setTimeout(() => setIsFlickering(false), 500);

            setTimeRemaining(newTime);
        };

        // Countdown logic
        const timer = setInterval(() => {
            setTimeRemaining(prev => prev > 0 ? prev - 1 : 0);
        }, 1000);

        return () => {
            clearInterval(timer);
            eventSource.close();
        };
    }, []);

    // Format time into HH:MM:SS
    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <Card className={`transition-colors duration-300 ${isFlickering ? 'bg-red-100' : 'bg-white'}`}>
            <CardHeader>
                <CardTitle>Countdown Timer</CardTitle>
            </CardHeader>
            <CardContent>
                <div
                    className={`text-4xl font-bold ${isFlickering ? 'text-red-600' : 'text-black'} transition-colors`}
                >
                    {formatTime(timeRemaining)}
                </div>
            </CardContent>
        </Card>
    );
};
