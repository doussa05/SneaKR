import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ setSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    axios.get(`http://localhost:3001/search?term=${searchTerm}`)
      .then(response => {
        setSearchResults(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la recherche :', error);
      });
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="flex w-full max-w-2xl">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Bonjour, que cherchez-vous aujourdhui ?"
          className="flex-grow p-2 border border-gray-300 rounded-l-md"
        />
        <button
          onClick={handleSearch}
          className="p-2 bg-purple-500 text-white rounded-r-md hover:bg-cyan-400"
        >
          Rechercher
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
