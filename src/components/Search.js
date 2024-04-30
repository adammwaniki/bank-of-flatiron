import React, { useState } from "react";

function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle changes in the search input
  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    // Pass the search term up to the parent component
    onSearch(term);
  };

  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder="Search your Recent Transactions"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <i className="circular search link icon"></i>
    </div>
  );
}

export default Search;
