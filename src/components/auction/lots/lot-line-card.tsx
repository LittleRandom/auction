"use client";
import { ChevronDown, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import IconComponent from "@/components/icon-component";
import { LotItem } from "@/lib/types";

export default function LotLineCard({ item }: { item: LotItem }) {
    const [expandedItem, setExpandedItem] = useState<Number | null>(null);

    const handleBid = (itemId: number) => {
        console.log(`Bid placed on item ${itemId}`);
    };

    return (
        <Card>
            <div key={item.id} className="group">
                <div className="grid grid-cols-12 items-center gap-4 p-4 hover:bg-primary-foreground rounded-lg">
                    {/* Left: Icon */}
                    <div className="col-span-1 text-2xl">
                        <IconComponent image_url={item.cf_bucket_url}></IconComponent>
                    </div>

                    {/* Middle: Item Details */}
                    <div className="col-span-6">
                        <h4 className="font-semibold">{item.name}</h4>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <Badge variant="outline">Lot {item.id}</Badge>
                            <Badge variant="outline">{item.condition}</Badge>
                            <span>MSRP: ${item.msrp.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Right: Bid Information */}
                    <div className="col-span-5 flex items-center justify-end gap-4">
                        <div className="text-right">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Users className="w-4 h-4" />
                                <span>{item.bid_count} bids</span>
                            </div>
                            <div className="font-semibold text-green-600">
                                ${item.current_bid.toLocaleString()}
                            </div>
                        </div>
                        <Button size="sm" onClick={() => handleBid(item.id)}>
                            Bid Now
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="p-0"
                            onClick={() =>
                                setExpandedItem(expandedItem === item.id ? null : item.id)
                            }
                        >
                            <ChevronDown
                                className={`w-5 h-5 transition-transform ${expandedItem === item.id ? "rotate-180" : ""}`}
                            />
                        </Button>
                    </div>
                </div>

                {/* Expandable Details Section */}
                {expandedItem === item.id && (
                    <div className="px-4 py-2 ml-12 text-sm rounded-lg items-start">
                        {item.condition}
                    </div>
                )}

                {/* <Separator className="my-2" /> */}
            </div>
        </Card>

    );
}
