import { LotListing } from "@/components/lot-listings";

export default async function Home() {

  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        {/* <main className=""> */}
        {/* <h2 className="font-medium text-xl mb-4">Next steps</h2> */}
        <LotListing />
      </main>
    </>
  );
}
