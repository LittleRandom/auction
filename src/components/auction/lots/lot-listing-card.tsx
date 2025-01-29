'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Timer,
} from 'lucide-react';
import LotLineCard from '@/components/auction/lots/lot-listing-line-card';
import { useLots } from '@/hooks/use-lots';
import { LoadingSpinner } from '@/components/placeholders/loading-spinner';

export default function LotListingCard() {
    const { data, isPending } = useLots()

    const lotInfo = {
        event_number: 2457,
        title: "8PM Thursday, November 20th",
        timeLeft: "4",
    };

    if (isPending) return <LoadingSpinner />

    return (
        <Card className="grow">
            <CardHeader>
                <div className="flex items-center justify-between mx-2">
                    <div>
                        <Badge variant="secondary" className="mb-2 grow">
                            Auction #{lotInfo.event_number}
                        </Badge>
                        <CardTitle >{lotInfo.title}</CardTitle>
                    </div>
                    <div className="flex items-center gap-1 text-orange-600 px-1">
                        <Timer className="w-4 h-4" />
                        <span>Ends in {lotInfo.timeLeft} hours</span>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <div className="space-y-4">
                    {data?.map((item) => (
                        <LotLineCard key={item.id} item={item}></LotLineCard>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
