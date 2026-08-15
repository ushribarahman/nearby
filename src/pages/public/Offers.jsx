import Card from "../../components/common/Card";
import OfferHero from "../../components/offers/OfferHero";
import offers from "../../data/Offers";
import Filter from "../../components/common/Filter";
import Search from "../../components/common/Search";
import CategoryFilter from "../../components/common/CategoryFilter";

function Offers() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      <div className="relative mb-8 overflow-hidden rounded-2xl">
        <OfferHero />
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-gray-50 p-3">

        <Filter />

        <div className="flex items-center gap-3">
          <div className="w-48">
            <Search />
          </div>

          <CategoryFilter />
        </div>

      </div>
      

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">

        {offers.map((offer) => (
          <Card
            key={offer.id}
            data={offer}
          />
        ))}

      </div>

    </div>
  );
}

export default Offers;