import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react'; 

const Product = ({ product }) => {
  const navigate = useNavigate();

  const handleAddToWishlist = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Vous devez être connecté pour ajouter un article à la wishlist.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id: product.id, name: product.name, image: product.image }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Article ajouté à la wishlist');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product p-4 bg-white shadow-md rounded-md">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-gray-700">{product.description}</p>
      <p className="text-green-600 font-bold">${product.price}</p>
      <div className="flex justify-between items-center mt-4">
        <button onClick={handleViewDetails} className="bg-orange-500 hover:text-cyan-400 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-blue-400">Voir les Détails</button> <br></br>
        <button onClick={handleAddToWishlist} className="text-orange-500 hover:bg-cyan-400">
          <Heart size={24} />
        </button>
      </div>
    </div>
  );
};

export default Product;
