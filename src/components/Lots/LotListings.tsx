'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    ChevronDown,
    Timer,
    Users
} from 'lucide-react';
import LotLineCard from './LotLineCard';

export const LotListing = () => {
    const [expandedItem, setExpandedItem] = useState<Number | null>(null);

    const lotInfo = {
        lotNumber: "LOT #2457",
        title: "Estate Collection: Vintage Americana",
        timeLeft: "4 hours",
        items: [
            {
                id: 1,
                title: "Vintage Leica M3 Camera",
                description: "Classic 35mm rangefinder camera with 50mm f/2 Summicron lens",
                condition: "Excellent",
                msrp: 4500,
                currentBid: 2800,
                totalBids: 12,
                icon: "📷"
            },
            {
                id: 2,
                title: "Antique Oak Writing Desk",
                description: "Victorian-era desk with original brass fittings",
                condition: "Good",
                msrp: 3200,
                currentBid: 1500,
                totalBids: 8,
                icon: "🪑"
            },
            {
                id: 3,
                title: "First Edition Hemingway",
                description: "The Sun Also Rises, 1926, with original dust jacket",
                condition: "Very Good",
                msrp: 12000,
                currentBid: 8500,
                totalBids: 15,
                icon: "📚"
            },
            {
                id: 4,
                title: "Art Deco Chandelier",
                description: "1920s crystal chandelier, fully restored",
                condition: "Excellent",
                msrp: 6800,
                currentBid: 4200,
                totalBids: 10,
                icon: "💡"
            }
        ]
    };

    return (
        <Card className="grow">
            <CardHeader>
                <div className="flex items-center justify-between mx-2">
                    <div>
                        <Badge variant="secondary" className="mb-2 grow">
                            {lotInfo.lotNumber}
                        </Badge>
                        <CardTitle >{lotInfo.title}</CardTitle>
                    </div>
                    <div className="flex items-center gap-1 text-orange-600 px-1">
                        <Timer className="w-4 h-4" />
                        <span>{lotInfo.timeLeft} left</span>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <div className="space-y-4">
                    {lotInfo.items.map((item) => (
                        <LotLineCard key={item.id} item={item}></LotLineCard>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default LotListing;