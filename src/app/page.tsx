import LotListingCard from "@/components/auction/lots/lot-listing-card";
import CategoryList from "@/components/category-list";

export default async function Home() {

  return (
    <>
      <div className="max-w-screen grid grid-cols-5 gap-5">
        <div className="">
          <CategoryList ></CategoryList>
        </div>
        <div className="col-start-2 col-span-4">
          <LotListingCard ></LotListingCard>
        </div>
      </div>
    </>
  );
}
