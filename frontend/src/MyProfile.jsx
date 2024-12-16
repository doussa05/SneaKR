import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react'; // Import de l'icône de profil
import Loading from './Loading'; // Import du composant de chargement

const MyProfile = () => {
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found in localStorage.');
        setError('Utilisateur non authentifié.');
        setLoading(false);
        return;
      }

      try {
        // Simuler un délai artificiel
        await new Promise(resolve => setTimeout(resolve, 1000));

        const response = await fetch('http://localhost:3001/myprofile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setProfile(data);
        } else {
          console.error('Failed to fetch profile:', data.message);
          setError('Erreur lors de la récupération des informations.');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Erreur lors de la récupération des informations.');
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Supprime le token du localStorage
    navigate('/'); // Redirige vers la page de connexion
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col">
     
      <main className="flex-grow p-2 flex flex-col items-center justify-center">
        {error ? (
          <div className="bg-white shadow-md rounded-md p-8 max-w-lg w-full h-80 flex flex-col justify-center items-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-md p-8 max-w-lg w-full h-80 flex flex-col justify-between">
            <div className="flex items-center space-x-4 mb-6">
              <User className="w-20 h-20 text-purple-500" /> {/* Icône de profil */}
              <div>
                <h2 className="text-lg font-bold">{profile.name}</h2>
                <p className="text-sm text-gray-600">{profile.email}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-6 rounded-md mt-6">
              Se Déconnecter
            </button>
          </div>
        )}
      </main>
      <footer className="bg-purple-200 p-0.5 h-4 text-center flex items-center justify-center">
        
      </footer>
    </div>
  );
};

export default MyProfile;
