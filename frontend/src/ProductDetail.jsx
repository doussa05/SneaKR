import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams(); // Récupère l'ID du produit depuis l'URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/products/${id}`);
        const data = await response.json();
        if (response.ok) {
          setProduct(data);
        } else {
          setError('Produit non trouvé');
        }
      } catch (error) {
        console.error('Erreur:', error);
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    };

    fetchProduct();
  }, [id]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!product) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-grow p-4 bg-gray-100 flex justify-center items-center">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3">
              <div className="aspect-w-1 aspect-h-1 w-full">
                <img className="object-cover w-full h-full" src={product.image} alt={product.name} />
              </div>
            </div>
            <div className="p-8 md:w-1/3 flex flex-col justify-center items-center space-y-2">
              <h2 className="text-2xl font-semibold text-center">{product.name}</h2>
              <p className="text-gray-700 text-center">{product.description}</p>
              <p className="text-green-600 font-bold text-xl text-center">${product.price}</p>
            </div>
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default ProductDetail;
