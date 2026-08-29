import { useParams, Link } from "react-router-dom";
import exploreData from "../../data/Explore";

function ExploreDetails() {
  const { id } = useParams();
  const place = exploreData.find((p) => p.id === parseInt(id));

  return (
    <div className="max-w-7xl mx-auto px-6 py-4 pb-8">
      <div className="relative w-full h-[500px] rounded-xl overflow-hidden mb-6">
        <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <h1 className="text-3xl font-bold text-white">{place.name}</h1>
          <div className="flex items-center gap-4 text-white/90 mt-2">
            <span>{place.location}</span>
            <span>•</span>
            <span>{place.type}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold">{place.name}</h2>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm text-gray-500">{place.city}</span> 
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg p-4 border">
          <div className="flex items-center gap-2 mb-1">
            <img src="https://img.icons8.com/?size=100&id=7880&format=png" alt="location" className="w-4 h-4" />
            <p className="text-sm text-gray-500">Location</p>
          </div>
          <p className="font-semibold text-sm">{place.location}</p>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <div className="flex items-center gap-2 mb-1">
            <img src="https://img.icons8.com/?size=100&id=10053&format=png" alt="hours" className="w-4 h-4" />
            <p className="text-sm text-gray-500">Hours</p>
          </div>
          <p className="font-semibold text-sm">{place.openingHours}</p>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <div className="flex items-center gap-2 mb-1">
            <img src="https://img.icons8.com/?size=100&id=1ztfvElILGPO&format=png" alt="fee" className="w-4 h-4" />
            <p className="text-sm text-gray-500">Entry Fee</p>
          </div>
          <p className="font-semibold">{place.entryFee === 0 ? "Free" : `৳${place.entryFee}`}</p>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <div className="flex items-center gap-2 mb-1">
            <img src="https://img.icons8.com/?size=100&id=60003&format=png&color=000000" alt="rating" className="w-4 h-4" />
            <p className="text-sm text-gray-500">Rating</p>
          </div>
          <p className="font-semibold"> {place.rating}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p className="text-gray-700">{place.description}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-3">
            <img src="https://img.icons8.com/?size=100&id=Hh5ONdvsAI4P&format=png&color=000000" alt="location" className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Location</h3>
          </div>
          <p className="font-medium">{place.location}</p>
          <p className="text-sm text-gray-500 mt-1">{place.city}</p>
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-[#01BBC1] hover:text-[#019ca1] hover:underline text-sm inline-block mt-2">
            View on Map →
          </a>
        </div>
      </div>

      <div className="mb-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-2">Opening Hours</h3>
        <p className="text-gray-700">{place.openingHours}</p>
        <p className="text-sm text-gray-500 mt-1">Entry Fee: {place.entryFee === 0 ? "Free" : `৳${place.entryFee}`}</p>
      </div>

      <div className="mt-8 pb-4">
        <Link to="/explore" className="block w-full max-w-md mx-auto">
          <button className="w-full flex items-center justify-center gap-2 bg-[#000000] text-white py-4 px-6 rounded-full text-base font-semibold hover:bg-gray-600 transition-colors">
            <img src="https://img.icons8.com/?size=100&id=99996&format=png&color=ffffff" alt="arrow" className="w-4 h-4" />
            <span>Back to Explore</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ExploreDetails;