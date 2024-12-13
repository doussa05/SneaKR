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

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="wishlist">
      <h1>Ma Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Aucun article dans la wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {wishlist.map((item, index) => (
            <div key={`${item.id}-${index}`} className="p-4 bg-white shadow-md rounded-md">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover mb-4" />
              <h2 className="text-xl font-semibold">{item.name}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWishlist;
