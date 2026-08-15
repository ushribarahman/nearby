function Search({ searchTerm, onSearchChange, placeholder = "Search events..." }) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-full border border-gray-300 px-4 py-2 pl-10 pr-10 text-sm focus:border-[#01BBC1] focus:outline-none focus:ring-1 focus:ring-[#01BBC1]"
      />
      
      <img
        src="https://img.icons8.com/?size=100&id=83218&format=png&color=000000"
        alt="searchbar"
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50"
      />
    </div>
  );
}

export default Search;