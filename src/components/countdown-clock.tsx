'use client'
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useWebSocket } from '@/hooks/use-websockets';
import { TimeLeft } from '@/lib/types';

const CountdownClock: React.FC = () => {
    const { endDateTime, extendTime } = useWebSocket();
    const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

    // Calculate time left
    const calculateTimeLeft = (): TimeLeft | null => {
        if (!endDateTime) return null;

        const now = new Date().getTime();
        const difference = endDateTime - now;

        if (difference <= 0) {
            return { hours: 0, minutes: 0, seconds: 0 };
        }

        return {
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    };

    // Update timer every second
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [endDateTime]);

    // Format time values to always show two digits
    const formatTime = (value: number): string => String(value).padStart(2, '0');

    if (!timeLeft) return <div>Loading...</div>;

    return (
        <Card className="w-full max-w-sm mx-auto">
            <CardContent className="p-6">
                <div className="text-center mb-4">
                    <div className="text-4xl font-bold font-mono">
                        {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
                    </div>
                </div>
                <div className="flex justify-center">
                    <Button
                        onClick={() => extendTime(30)}
                        className="bg-blue-500 hover:bg-blue-600"
                    >
                        Add 30 Seconds
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default CountdownClock;