import { useState, useMemo } from "react";
import Card from "../../components/common/Card";
import Search from "../../components/common/Search";
import Filter from "../../components/common/Filter";
import CategoryFilter from "../../components/common/CategoryFilter";
import events from "../../data/Events";

function Events() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const allCategories = useMemo(() => {
    const categoryCounts = {};
    events.forEach(event => {
      if (event.category) {
        const category = event.category.trim();
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      }
    });

    return Object.entries(categoryCounts)
      .map(([label, count]) => ({
        id: label.toLowerCase().replace(/ /g, '-'),
        label: label,
        count: count
      }))
      .sort((a, b) => b.count - a.count);
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      if (selectedFilter !== "all") {
        const statusMap = {
          "live": ["available", "active", "live"],
          "upcoming": ["coming soon", "upcoming"],
        };
        const statusMatch = statusMap[selectedFilter]?.some(
          (status) => event.status?.toLowerCase() === status
        );
        if (!statusMatch) return false;
      }

      if (selectedCategories.length > 0) {
        const eventCategoryId = event.category?.toLowerCase().replace(/ /g, '-');
        if (!selectedCategories.includes(eventCategoryId)) return false;
      }

      if (searchTerm) {
        return event.title?.toLowerCase().includes(searchTerm.toLowerCase());
      }

      return true;
    });
  }, [selectedFilter, selectedCategories, searchTerm, events]);

  const toggleCategory = (categoryId) => {
    if (Array.isArray(categoryId)) {
      setSelectedCategories(categoryId);
    } else {
      setSelectedCategories(prev =>
        prev.includes(categoryId)
          ? prev.filter(id => id !== categoryId)
          : [...prev, categoryId]
      );
    }
  };

  const clearAllCategories = () => {
    setSelectedCategories([]);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="relative mb-8 overflow-hidden rounded-2xl">
        <img
          src="/banner.png" 
          alt="Events Banner"
          className="w-full h-auto"
        />
</div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-gray-50 p-3">
        <div className="flex flex-wrap items-center gap-3">
          <Filter 
            selectedFilter={selectedFilter} 
            onFilterChange={setSelectedFilter} 
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="w-48">
            <Search
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              placeholder="Search events..."
            />
          </div>
          
          <CategoryFilter
            categories={allCategories}
            selectedCategories={selectedCategories}
            onCategoryToggle={toggleCategory}
            onClearAll={clearAllCategories}
          />
        </div>
      </div>

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {filteredEvents.map((event) => (
            <Card key={event.id} data={event} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 py-16 px-4 text-center">
          <svg
            className="mb-4 h-16 w-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          
          <h3 className="mb-2 text-xl font-semibold text-gray-700">
            No events found
          </h3>
          
          <p className="text-gray-500">
            {searchTerm ? (
              <>We couldn't find any events matching "<span className="font-medium">{searchTerm}</span>"</>
            ) : selectedCategories.length > 0 ? (
              <>No events available in selected categories</>
            ) : (
              <>No events available</>
            )}
          </p>
          
          {(searchTerm || selectedCategories.length > 0) && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategories([]);
              }}
              className="mt-4 rounded-full bg-[#01BBC1] px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-[#019aa0]"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Events;