import CategoryList from "@/src/components/CategoryList";
import { LotListing } from "@/src/components/Lots/LotListings";

export default async function Home() {

  return (
    <>
      <div className="max-w-full grid grid-cols-5 gap-5">
        <div className="">
          <CategoryList ></CategoryList>
        </div>
        <div className="col-start-2 col-span-4">
          <LotListing ></LotListing>
        </div>
      </div>
    </>
  );
}
