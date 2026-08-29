function SearchFilter({ 
  searchTerm, 
  setSearchTerm, 
  filterStatus, 
  setFilterStatus, 
  placeholder = "Search..."
}) {
  return (
    <div className="border-b border-gray-200 p-4">
      <div className="flex flex-wrap items-center gap-3">

        <div className="relative min-w-[240px] flex-1">
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 pl-10 text-sm outline-none transition focus:border-black focus:bg-white"
          />

          <img
            src="https://img.icons8.com/?size=100&id=83218&format=png&color=000000"
            alt="searchbar"
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50"
          />
        </div>

        <button
          onClick={() => setFilterStatus("all")}
          className={`rounded-lg px-5 py-3 text-sm font-medium transition ${
            filterStatus === "all"
              ? "bg-black text-white"
              : "bg-gray-50 text-gray-600 hover:bg-gray-100"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilterStatus("Approved")}
          className={`rounded-lg px-5 py-3 text-sm font-medium transition ${
            filterStatus === "Approved"
              ? "bg-black text-white"
              : "bg-gray-50 text-gray-600 hover:bg-gray-100"
          }`}
        >
          Approved
        </button>

        <button
          onClick={() => setFilterStatus("Pending")}
          className={`rounded-lg px-5 py-3 text-sm font-medium transition ${
            filterStatus === "Pending"
              ? "bg-black text-white"
              : "bg-gray-50 text-gray-600 hover:bg-gray-100"
          }`}
        >
          Pending
        </button>
      </div>
    </div>
  );
}

export default SearchFilter;