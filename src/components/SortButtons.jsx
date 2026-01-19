const SortButtons = ({ currentSort, onSortChange }) => {
  const sortOptions = [
    { value: "id-ascending", label: "ID - Low to High" },
    { value: "id-descending", label: "ID - High to Low" },
  ];

  return (
    <div className="flex items-center gap-2 mb-6">
      <span className="text-sm text-gray-600 font-medium">Sort by:</span>
      <div className="flex gap-2">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onSortChange(option.value)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              currentSort === option.value
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortButtons;
