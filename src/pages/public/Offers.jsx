import Card from "../../components/common/Card";
import OfferHero from "../../components/offers/OfferHero";
import offers from "../../data/Offers";

function Offers() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-0">

      <OfferHero />
      

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