import React, { useState } from 'react';
import '../styles/styles.css';

interface SearchBarProps {
  animals: any[];
  onResults: (results: any[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ animals, onResults }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    const results = animals.filter((animal) =>
      animal.name.toLowerCase().includes(query.toLowerCase())
    );
    onResults(results);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for an animal"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
