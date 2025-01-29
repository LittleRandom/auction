'use client'
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

const AuctionItemPage = () => {
    const [selectedImage, setSelectedImage] = useState(0);

    // Sample data - in a real app this would come from props or API
    const item = {
        name: "Vintage Leather Armchair",
        currentPrice: 450,
        timeRemaining: "2 days 4 hours",
        totalBids: 23,
        images: [
            "/api/placeholder/600/400",
            "/api/placeholder/600/400",
            "/api/placeholder/600/400",
            "/api/placeholder/600/400"
        ]
    };

    return (
        <div className="container mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left side - Images */}
                <Card className="p-4">
                    <div className="mb-4">
                        <img
                            src={item.images[selectedImage]}
                            alt={`${item.name} - View ${selectedImage + 1}`}
                            className="w-full rounded-lg object-cover"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto">
                        {item.images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`flex-shrink-0 ${selectedImage === index ? 'ring-2 ring-blue-500' : ''
                                    }`}
                            >
                                <img
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="h-16 w-16 rounded object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </Card>

                {/* Right side - Item details and bid form */}
                <Card className="p-6">
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold mb-4">{item.name}</h1>
                            <div className="grid gap-4">
                                <div>
                                    <Label className="text-lg">Current Price</Label>
                                    <p className="text-2xl font-bold text-green-600">
                                        ${item.currentPrice.toLocaleString()}
                                    </p>
                                </div>

                                <div>
                                    <Label className="text-lg">Time Remaining</Label>
                                    <p className="text-xl text-orange-600 font-semibold">
                                        {item.timeRemaining}
                                    </p>
                                </div>

                                <div>
                                    <Label className="text-lg">Total Bids</Label>
                                    <p className="text-lg">{item.totalBids} bids</p>
                                </div>

                                <div className="pt-4">
                                    <Label htmlFor="bid-amount" className="text-lg">
                                        Your Bid Amount
                                    </Label>
                                    <div className="flex gap-2 mt-2">
                                        <Input
                                            id="bid-amount"
                                            type="number"
                                            min={item.currentPrice + 1}
                                            placeholder={`Min bid: $${(item.currentPrice + 1).toLocaleString()}`}
                                            className="text-lg"
                                        />
                                        <Button className="px-8">
                                            Place Bid
                                        </Button>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Enter an amount greater than ${item.currentPrice.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AuctionItemPage;