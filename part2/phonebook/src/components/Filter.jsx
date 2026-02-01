const Filter = ({ searchTerm, handleSearchInput }) => {
  return (
    <div>
      filter shown with{" "}
      <input value={searchTerm} onChange={handleSearchInput} />
    </div>
  );
};

export default Filter;
