import LoadingSkeleton from "../../components/common/LoadingSkeleton";
import { useState } from "react";
import Card from "../../components/common/Card";
import PublicListingFilters from "../../components/common/PublicListingFilters";
import OfferHero from "../../components/offers/OfferHero";
import useOffers from "../../hooks/useOffers";
import { matchesPublicFilters } from "../../utils/publicFilters";
export default function Offers() {
  const { offers, loading, error } = useOffers();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const filtered = offers.filter((item) =>
    matchesPublicFilters(item, search, location, category),
  );
  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <OfferHero />
      <PublicListingFilters
        kind="offers"
        search={search}
        onSearch={setSearch}
        location={location}
        onLocation={setLocation}
        category={category}
        onCategory={setCategory}
        categories={offers.map((item) => item.category).filter(Boolean)}
      />
      {loading ? (
        <LoadingSkeleton variant="cards" />
      ) : error ? (
        <p role="alert">{error}</p>
      ) : filtered.length === 0 ? (
        <p>No offers match your search or location.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {filtered.map((item) => (
            <Card
              key={item.id}
              data={{
                ...item,
                date: /^\d{4}-\d{2}-\d{2}$/.test(item.date)
                  ? new Date(item.date + "T12:00:00").toLocaleDateString(
                      "en-GB",
                      { day: "numeric", month: "short", year: "numeric" },
                    )
                  : item.date,
              }}
            />
          ))}
        </div>
      )}
    </main>
  );
}
