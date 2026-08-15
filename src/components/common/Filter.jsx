function Filter({ selectedFilter, onFilterChange }) {
  const filters = [
    { id: "all", label: "All" },
    { id: "live", label: "Live" },
    { id: "upcoming", label: "Upcoming" },
  ];

  return (
    <div className="flex items-center gap-2">
      {filters.map((filter) => (
        <button
          key={filter.id}
         className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            filter.id === "all"
              ? "bg-black text-white"
              : "bg-white text-gray-600"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;