"use client"
import { Card } from "../../ui/card";
import { Label } from "@/components/ui/label";
import ImageComponent from "@/components/image-component";
import { Tables } from "@/lib/supabase/database.types";
import { useLotItems } from "@/hooks/use-lots";
import { LoadingSpinner } from "@/components/placeholders/loading-spinner";
import { notFound } from "next/navigation";
import LotPageCard from "@/components/auction/lots/lot-page-card";

export default function LotCard({ id }: { id: string }) {
    const { data, isPending } = useLotItems(id)

    if (isPending) return <LoadingSpinner />
    if (!isPending && !data) {
        notFound()
    }

    return (
        <div>
            <div>
                <Card>
                    <LotPageCard data={data!}></LotPageCard>
                </Card>
            </div>
        </div>
    )

}