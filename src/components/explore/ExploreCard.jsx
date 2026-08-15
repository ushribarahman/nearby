import cardimage from "/garden1.jpg";

function ExploreCard({ data }) {
  return (
    <div className="w-full overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row">
        
        <div className="relative sm:w-56 md:w-64 lg:w-72 h-48 sm:h-auto flex-shrink-0">
          <img
            src={data?.image || cardimage}
            alt={data?.name || "Explore Place"}
            className="w-full h-52 object-cover"
          /> 
        </div>

        <div className="flex-1 p-4 sm:p-5 flex flex-col">
          
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 hover:text-[#01BBC1] transition-colors line-clamp-1">
            {data?.name || "Place Name"}
          </h3>

          <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-600">
            <img 
                src="https://img.icons8.com/?size=100&id=7880&format=png&color=000000"
                alt="location"
                className="h-4 w-4 opacity-50"
            />
            <span>{data?.location || "Location"}</span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">{data?.city || "City"}</span>
          </div>

          <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-600">
            <img 
                src="https://img.icons8.com/?size=100&id=83218&format=png&color=000000"
                alt="clock"
                className="h-4 w-4 opacity-50"
            />
            <span>{data?.openingHours || "Opening Hours"}</span>
          </div>

          <p className="mt-2 text-sm text-gray-500 line-clamp-2 flex-1">
            {data?.description || "Description not available"}
          </p>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold`}>
                {data?.entryFee === 0 ? "Free Entry" : `৳${data.entryFee}`}
              </span>
              {data?.entryFee > 0 && (
                <span className="text-xs text-gray-400">per person</span>
              )}
            </div>
            
            <button className="rounded-lg bg-[#01BBC1] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#019aa0] transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExploreCard;