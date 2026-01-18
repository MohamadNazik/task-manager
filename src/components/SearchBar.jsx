const SearchBar = ({ query, onSearchChange }) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        value={query}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search task by title..."
        className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-500 shadow-md"
      />
    </div>
  );
};

export default SearchBar;
