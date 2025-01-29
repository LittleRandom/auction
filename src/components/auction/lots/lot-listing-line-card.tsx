"use client";
import { ChevronDown, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useTransition } from "react";
import IconComponent from "@/components/icon-component";
import { LotItem } from "@/lib/types";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import { NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function LotListingLineCard({ item }: { item: LotItem }) {
    const [expandedItem, setExpandedItem] = useState<Number | null>(null);

    const itemUri = '/lots/' + item.id

    const handleBid = (itemId: number) => {
        console.log(`Bid placed on item ${itemId}`);
    };

    const router = useRouter()
    return (
        <Card >
            <div key={item.id} className="group">
                <div className="grid grid-cols-12 items-center gap-4 p-4 hover:bg-primary-foreground rounded-lg"
                    onClick={() =>
                        setExpandedItem(expandedItem === item.id ? null : item.id)
                    }
                >
                    {/* Left: Icon */}
                    <div className="col-span-3 transition-transform hover:scale-105 cursor-pointer"
                        onClick={() => router.push(itemUri)}
                    >
                        <IconComponent image_url={item.cf_bucket_url}></IconComponent>
                    </div>

                    {/* Middle: Item Details */}
                    <div className="col-span-5 mx-5">
                        <h4 className="font-semibold tracking-tighter text-xs sm:text-base md:text-lg lg:text-2xl ">
                            <Link href={itemUri}>{item.name}</Link>
                        </h4>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <Badge variant="outline">Lot {item.id}</Badge>
                            <Badge variant="outline">{item.condition}</Badge>

                            <h2 className="font-semibold">
                                MSRP: ${item.msrp.toLocaleString()}
                            </h2>
                            {/* <NavigationMenuLink className={navigationMenuTriggerStyle()}> */}
                            {/* {item.name} */}
                            {/* </NavigationMenuLink> */}
                        </div>
                    </div>

                    {/* Right: Bid Information */}
                    <div className="col-span-4 flex items-center justify-end gap-4">
                        <div className="text-right">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Users className="w-4 h-4" />
                                <span>{item.bid_count} bids</span>
                            </div>
                            <div className="font-semibold text-green-600">
                                ${item.current_bid.toLocaleString()}
                            </div>
                        </div>

                        <Button
                            variant="link"
                            size="sm"
                            className="p-5"
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
                    <div className="my-2">
                        <div className="px-4 py-2 ml-12 text-sm rounded-lg items-start">
                            <Button size="sm" onClick={() => handleBid(item.id)}>
                                Bid Now
                            </Button>
                        </div>
                    </div>
                )}

                {/* <Separator className="my-2" /> */}
            </div>
        </Card>

    );
}
