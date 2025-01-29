import LotCard from "@/components/auction/lots/lot-card"

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