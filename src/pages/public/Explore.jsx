import SearchBar from "../../components/explore/SearchBar";
import ExploreHero from "../../components/explore/ExploreHero";
import ExploreCard from "../../components/explore/ExploreCard";
import exploreData from "../../data/Explore"; 

function Explore() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="relative mb-8 overflow-hidden rounded-2xl">
        <ExploreHero />
      </div>

      <div className="mb-8">
        <SearchBar />
      </div>

      <div className="flex flex-col gap-4">
          {exploreData.map((item) => (
            <ExploreCard key={item.id} data={item} />
          ))}
        </div>

    </div>
  );
}

export default Explore;