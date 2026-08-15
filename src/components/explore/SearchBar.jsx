function SearchBar({ placeholder = "Search..." }) {
  const cities = ["All Cities", "Dhaka", "Chattogram", "Gazipur", "Narayanganj", "Sylhet", "Rajshahi", "Khulna"];
  const locations = ["All Locations", "Mirpur", "Gulshan", "Banani", "Uttara", "Dhanmondi", "Paltan", "Motijheel", "Ramna"];
  const dates = ["All Dates", "Today", "Tomorrow", "This Weekend", "Next Week", "This Month"];

  return (
    <div className="flex flex-col lg:flex-row gap-3 w-full">
      <div className="relative flex-1 min-w-[200px]">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full rounded-full border border-gray-300 px-4 py-2.5 pl-10 pr-4 text-sm focus:border-[#01BBC1] focus:outline-none focus:ring-1 focus:ring-[#01BBC1] transition-colors"
        />
        <img
          src="https://img.icons8.com/?size=100&id=83218&format=png&color=000000"
          alt="Search"
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50"
        />
      </div>

      <div className="relative w-full sm:w-[140px]">
        <select className="w-full appearance-none rounded-full border border-gray-300 bg-white px-4 py-2.5 pr-8 text-sm text-gray-700 focus:border-[#01BBC1] focus:outline-none focus:ring-1 focus:ring-[#01BBC1] transition-colors cursor-pointer">
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        <img 
            src="https://img.icons8.com/?size=100&id=40021&format=png&color=000000"
            alt="dropdown"
            className="absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 opacity-100"
        />
      </div>

      <div className="relative w-full sm:w-[140px]">
        <select className="w-full appearance-none rounded-full border border-gray-300 bg-white px-4 py-2.5 pr-8 text-sm text-gray-700 focus:border-[#01BBC1] focus:outline-none focus:ring-1 focus:ring-[#01BBC1] transition-colors cursor-pointer">
          {locations.map((location) => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
        <img 
            src="https://img.icons8.com/?size=100&id=40021&format=png&color=000000"
            alt="dropdown"
            className="absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 opacity-100"
        />
      </div>

      <div className="relative w-full sm:w-[140px]">
        <select className="w-full appearance-none rounded-full border border-gray-300 bg-white px-4 py-2.5 pr-8 text-sm text-gray-700 focus:border-[#01BBC1] focus:outline-none focus:ring-1 focus:ring-[#01BBC1] transition-colors cursor-pointer">
          {dates.map((date) => (
            <option key={date} value={date}>{date}</option>
          ))}
        </select>
        <img 
            src="https://img.icons8.com/?size=100&id=40021&format=png&color=000000"
            alt="dropdown"
            className="absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 opacity-100"
        />
      </div>
    </div>
  );
}

export default SearchBar;