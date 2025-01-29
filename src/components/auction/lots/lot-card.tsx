'use client'
import { LoadingSpinner } from "../../loading-spinner";
import { Card } from "../../ui/card";
import { Label } from "@/components/ui/label";
import ImageComponent from "@/components/image-component";
import { useLotItems } from "@/hooks/use-lots";
import { notFound } from 'next/navigation';

export default function LotCard({ id }: { id: string }) {
    const { data, isLoading } = useLotItems(id)

    if (!data) {
        notFound()
    }

    if (isLoading) return <LoadingSpinner />

    return (
        <div>
            <div>
                <Card>
                    <Label></Label>
                    <ImageComponent image_url={data!.cf_bucket_url} />
                </Card>
                <h1>{JSON.stringify(data, null, 2)}</h1>
            </div>
        </div>
    )

}