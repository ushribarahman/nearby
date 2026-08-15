function Filter({ selectedFilter, onFilterChange }) {
  const filters = [
    { id: "all", label: "All" },
    { id: "live", label: "Live" },
    { id: "upcoming", label: "Upcoming" },
  ];

  return (
    <div className="flex gap-2 mb-6">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            selectedFilter === filter.id
              ? "bg-[#01BBC1] text-white"
              : "bg-white text-gray-600 hover:bg-gray-200"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;