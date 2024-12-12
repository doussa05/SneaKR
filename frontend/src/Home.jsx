import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

function Home() {
  const navigate = useNavigate();
  const myLocalStoredToken = localStorage.getItem("token");
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleAuth = async () => {
    const response = await fetch('http://localhost:3001/checkauth', {
      method: 'GET',
      headers: {
        'access-token': myLocalStoredToken,
      },
    });
    const data = await response.json();

    if (response.ok && data === "Not Authenticated") {
      navigate('/');
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">SneaKR</h1>
      <SearchBar setSearchResults={setSearchResults} />
      <button onClick={handleAuth} className="btn btn-primary mb-4">CheckAuth</button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(searchResults.length > 0 ? searchResults : products).map(product => (
          <div key={product.id} className="p-4 bg-white shadow-md rounded-md">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-green-600 font-bold">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
