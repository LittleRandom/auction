import LotCard from "@/components/auction/lots/lot-card"
import { notFound } from "next/navigation";
import { userAgent } from "next/server"
import { useState } from "react";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {

    const id = (await params).id
    return (
        <LotCard id={id}></LotCard>
    )
}