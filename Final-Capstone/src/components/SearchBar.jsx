/* eslint-disable react/prop-types */
export function SearchBar({ filterKey, setFilterKey }) {
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setFilterKey(inputValue); // Update the filterKey state in App.jsx
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      value={filterKey}
      onChange={handleInputChange}
    />
  );
}
