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

    const handleBid = (itemId: number) => {
        console.log(`Bid placed on item ${itemId}`);
    };

    return (
        <div className="w-full px-4">
            <Card className="w-full">
                <CardHeader className="space-y-2">
                    <div className="flex justify-between items-center">
                        <div>
                            <Badge variant="secondary" className="mb-2">
                                {lotInfo.lotNumber}
                            </Badge>
                            <CardTitle>{lotInfo.title}</CardTitle>
                        </div>
                        <div className="flex items-center gap-2 text-orange-600">
                            <Timer className="w-4 h-4" />
                            <span>{lotInfo.timeLeft} left</span>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="space-y-4">
                        {lotInfo.items.map((item) => (
                            <div key={item.id} className="group">
                                <div className="grid grid-cols-12 items-center gap-4 p-4 hover:bg-gray-50 rounded-lg">
                                    {/* Left: Icon */}
                                    <div className="col-span-1 text-2xl">
                                        {item.icon}
                                    </div>

                                    {/* Middle: Item Details */}
                                    <div className="col-span-6">
                                        <h4 className="font-semibold">{item.title}</h4>
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <Badge variant="outline">
                                                {item.condition}
                                            </Badge>
                                            <span>MSRP: ${item.msrp.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    {/* Right: Bid Information */}
                                    <div className="col-span-5 flex items-center justify-end gap-4">
                                        <div className="text-right">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Users className="w-4 h-4" />
                                                <span>{item.totalBids} bids</span>
                                            </div>
                                            <div className="font-semibold text-green-600">
                                                ${item.currentBid.toLocaleString()}
                                            </div>
                                        </div>
                                        <Button
                                            size="sm"
                                            onClick={() => handleBid(item.id)}
                                        >
                                            Bid Now
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="p-0"
                                            onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                                        >
                                            <ChevronDown className={`w-5 h-5 transition-transform ${expandedItem === item.id ? 'rotate-180' : ''}`} />
                                        </Button>
                                    </div>
                                </div>

                                {/* Expandable Details Section */}
                                {expandedItem === item.id && (
                                    <div className="px-4 py-2 ml-12 text-sm text-gray-600 bg-gray-50 rounded-lg">
                                        {item.description}
                                    </div>
                                )}

                                <Separator className="my-2" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default LotListing;