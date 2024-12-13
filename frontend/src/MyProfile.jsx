import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading'; // Import du composant de chargement

const MyProfile = () => {
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Ajout de l'état de chargement
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found in localStorage.');
        setError('Utilisateur non authentifié.');
        setLoading(false); // Arrêter le chargement
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

      setLoading(false); // Arrêter le chargement après la récupération des données
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Supprime le token du localStorage
    navigate('/'); // Redirige vers la page de connexion
  };

  if (loading) {
    return <Loading />; // Afficher le composant de chargement
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="profile p-4">
      <h1 className="text-2xl font-bold mb-4">Mon Profil</h1>
      <p><strong>Nom :</strong> {profile.name}</p>
      <p><strong>Email :</strong> {profile.email}</p>
      <button onClick={handleLogout} className="btn btn-danger mt-4">Se Déconnecter</button>
    </div>
  );
};

export default MyProfile;
