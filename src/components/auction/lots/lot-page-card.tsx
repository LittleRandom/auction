'use client'
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { LotItem } from '@/lib/types';
import { Separator } from '@/components/ui/separator';

export default function LotPageCard({ data }: { data: LotItem }) {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="container mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left side - Images */}
                <Card className="p-4">
                    <div className="mb-4">
                        <img
                            src={data.cf_bucket_url}
                            alt={`${data.name} - View ${selectedImage + 1}`}
                            className="w-full rounded-lg object-cover"
                        />
                    </div>
                    {/* <div className="flex gap-2 overflow-x-auto">
                        {data.cf_bucket_url.map((image, index) => (
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
                    </div> */}
                </Card>

                {/* Right side - Item details and bid form */}
                <Card className="p-6">
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold my-2">{data.name}</h1>
                            <Separator />
                            <div className="grid gap-2">
                                <div className='flex mt-2'>
                                    <Label className="font-extralight text-base mr-2">Current Price </Label>
                                    <p className="text-base font-semibold text-green-600">
                                        ${data.current_bid.toString()}
                                    </p>
                                </div>

                                <div >
                                    <Label htmlFor="bid-amount" className="text-lg">
                                        Your Bid Amount
                                    </Label>
                                    <div className="flex gap-2 mt-2">
                                        <Input
                                            id="bid-amount"
                                            type="number"
                                            min={data.current_bid + 1}
                                            placeholder={`Min bid: $${(data.current_bid + 1).toLocaleString()}`}
                                            className="text-lg"
                                        />
                                        <Button className="px-8">
                                            Place Bid
                                        </Button>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Enter an amount greater than ${data.current_bid.toLocaleString()}
                                    </p>
                                </div>

                                <div>
                                    <Label className="text-lg">Time Remaining</Label>
                                    <p className="text-xl text-orange-600 font-semibold">
                                        {data.event_num}
                                    </p>
                                </div>

                                <div>
                                    <Label className="text-lg">Number of Bids</Label>
                                    <p className="text-lg">{data.bid_count} bids</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};