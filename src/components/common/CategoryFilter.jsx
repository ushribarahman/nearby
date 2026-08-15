import { useState } from "react";

function CategoryFilter({ categories, selectedCategories, onCategoryToggle, onClearAll }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCategory = (categoryId) => {
    onCategoryToggle(categoryId);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
          selectedCategories.length > 0
            ? "bg-[#01BBC1] text-white"
            : "bg-white text-gray-600 hover:bg-gray-200"
        }`}
      >
        <img
          src="https://img.icons8.com/?size=100&id=tBHxiVksS0Fw&format=png&color=000000"
          alt="filter"
          className="h-4 w-4"
        />
        {selectedCategories.length > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#01BBC1] text-[10px] text-white">
            {selectedCategories.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-lg bg-white shadow-lg z-10">
          <div className="p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">Categories</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className="flex cursor-pointer items-center justify-between rounded-md px-2 py-1.5 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => toggleCategory(category.id)}
                      className="h-4 w-4 rounded border-gray-300 accent-[#01BBC1] focus:ring-[#01BBC1]"
                    />
                    <span className="text-sm text-gray-700">{category.label}</span>
                  </div>
                  <span className="text-xs text-gray-500">{category.count}</span>
                </label>
              ))}
            </div>
            <div className="mt-3 flex gap-2 border-t pt-3">
              <button
                onClick={() => {
                  onClearAll();
                  setIsOpen(false);
                }}
                className="w-full rounded-md bg-[#01BBC1] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#019aa0]"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryFilter;