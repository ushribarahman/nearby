import SearchBar from "../../components/explore/SearchBar";
import ExploreHero from "../../components/explore/ExploreHero";
import ExploreCard from "../../components/explore/ExploreCard";
import exploreData from "../../data/Explore"; 

function Explore() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
        <ExploreHero />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-gray-100 p-3">
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