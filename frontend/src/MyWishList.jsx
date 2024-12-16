import React, { useEffect, useState } from 'react';

const MyWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found in localStorage.');
        setError('Utilisateur non authentifié.');
        return;
      }

      try {
        const response = await fetch('http://localhost:3001/wishlist', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setWishlist(data);
        } else {
          console.error('Failed to fetch wishlist:', data.message || 'Undefined error');
          setError('Erreur lors de la récupération des articles de la wishlist.');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Erreur lors de la récupération des articles de la wishlist.');
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
     
      <main className="flex-grow p-1">
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : wishlist.length === 0 ? (
          <p>Aucun article dans la wishlist.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {wishlist.map((item, index) => (
              <div key={`${item.id}-${index}`} className="p-2 bg-white shadow-md rounded-md">
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover mb-2" />
                <h2 className="text-sm font-semibold">{item.name}</h2>
              </div>
            ))}
          </div>
        )}
      </main>
      
    </div>
  );
};

export default MyWishlist;
