import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import Product from './Product'; // Assure-toi que ce chemin est correct

function Home() {
 
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

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
    
      <SearchBar setSearchResults={setSearchResults} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(searchResults.length > 0 ? searchResults : products).map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>

    </div>
  );
}

export default Home;
