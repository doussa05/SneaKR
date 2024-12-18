const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken"); 
const bodyParser = require('body-parser');
const PORT = 3001;
const verifyJwt = require('./middlewares/verifyJwt.js');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "signup",
  port: 3306
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const sql = "INSERT INTO login (name, email, password, token) VALUES (?, ?, ?, ?)";
  const values = [name, email, password, 'undefined'];  

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ success: 'Utilisateur enregistré avec succès !' });
  });
});


app.get('/checkauth', verifyJwt, (req, res) => {
  return res.json("Authenticated");
});

// Route de connexion 
app.post('/login', (req, res) => { const { email, password } = req.body; 
//Vérification de l'existence de l'email 
 const sqlEmail = 'SELECT * FROM login WHERE email = ?'; db.query(sqlEmail, [email], (err, results) => { if (err) { console.error('Database error:', err); return res.status(500).json({ error: 'Erreur serveur' }); } if (results.length === 0) { return res.status(400).json({ error: 'Le compte n\'existe pas' }); } const user = results[0]; 
 // Vérification du mot de passe
   if (password !== user.password) { 
    // Si tu utilises un hash pour les mots de passe, remplace par bcrypt.compare 
     return res.status(400).json({ error: 'Mot de passe incorrect' }); } const id = user.id; const token = jwt.sign({ id }, "jwtSecretKey", { expiresIn: '1h' });
      // Mise à jour du token dans la base de données 
       const updateTokenSql = "UPDATE login SET token = ? WHERE id = ?"; db.query(updateTokenSql, [token, id], (err, updateResult) => { if (err) { console.error('Database error:', err); return res.status(500).json({ error: 'Erreur serveur' }); } return res.status(200).json({ Login: true, token, user }); }); }); });
// Route pour récupérer les informations du profil
  app.get('/myprofile', verifyJwt, (req, res) => { 
    const userId = req.user.id; 
    db.query('SELECT name, email FROM login WHERE id = ?', 
      [userId], (err, results) => { 
        if (err) {
           return res.status(500).json({ message: 'Erreur serveur' 

           }); 
          } 
           if (results.length === 0) { 
            return res.status(404).json({ message: 'Utilisateur non trouvé' }); 
          } res.status(200).json(results[0]); 
        }); 
      });
         // Route pour ajouter un article à la wishlist 
         app.post('/wishlist', verifyJwt, (req, res) => { 
          const userId = req.user.id; const { name, image, id: productId } = req.body; 
          if (!productId || !name || !image) { 
            return res.status(400).json({ message: 'Product ID, name, and image are required' }); } 
            const sql = 'INSERT INTO wishlist (id, name, image, user_id) VALUES (?, ?, ?, ?)'; db.query(sql, [productId, name, image, userId], (err, result) => { if (err) { console.error('Database error:', err); return res.status(500).json({ message: 'Erreur serveur' }); } res.status(200).json({ message: 'Article ajouté à la wishlist' }); }); });
          // Route pour récupérer les articles de la wishlist 
          app.get('/wishlist', verifyJwt, (req, res) => { const userId = req.user.id; const sql = 'SELECT id, name, image FROM wishlist WHERE user_id = ?'; db.query(sql, [userId], (err, results) => { if (err) { console.error('Database error:', err); // Log plus détaillé
           return res.status(500).json({ message: 'Erreur serveur' }); } res.status(200).json(results); }); });
          
app.get('/wishlist', verifyJwt, (req, res) => { const userId = req.user.id; const sql = 'SELECT id, name, image FROM wishlist WHERE user_id = ?'; db.query(sql, [userId], (err, results) => { if (err) { console.error('Database error:', err); return res.status(500).json({ message: 'Erreur serveur' }); } res.status(200).json(results); }); });
// route la bare de recherche


app.get('/search', (req, res) => { 

  const searchTerm = req.query.term; 
  const sql = 'SELECT * FROM products WHERE name LIKE ?'; 
  db.query(sql, [`%${searchTerm}%`], (err, results) => { 
    if (err) { 

      console.error('Database error:', err); 
      return res.status(500).json({ message: 'Erreur serveur' }); 
    } 
    
    res.status(200).json(results); 
 
  }); 
  });





  const products = [ { id: 2, name: 'New Balance 574', description: 'Chaussures de course légères', price: 90, image: 'https://img01.ztat.net/article/spp-media-p1/df9f7e558e9f41b39fef959e5dec8394/f262df9286984dd097140845a9d8f238.jpg?imwidth=1800' },
    { id: 4, name: 'Nike Air Max 90', description: 'Confort et style avec une semelle Air', price: 120, image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRp3vOsdsAFljauvLhWkQRORzwEgeA7BiFiuUP_n_3DMu2eRcUsNut7hX0br5wnGVyN1W8_7AvB-mfPZeO-g7ntY_7CBDVJm-kaHnXfUrkU5X65y7f3tmdqPAcjaKYHGzF2_q25mNE&usqp=CAc' },
    { id: 5, name: 'Adidas Ultra Boost', description: 'Confort exceptionnel avec la technologie Boost', price: 180, image: 'https://img01.ztat.net/article/spp-media-p1/728312b2566841beb7d88989b3cb378d/a045a17fb1c94497973e6a19524bf427.jpg?imwidth=1800' },
    { id:6 , name: 'Reebok Classic Leather', description: 'Design rétro et confortable', price: 85, image: 'https://i8.amplience.net/i/jpl/jd_708403_b?qlt=92&w=950&h=673&v=1&fmt=auto' },
    { id: 7, name: 'Vans Old Skool', description: 'Style décontracté avec une touche de skate', price: 70, image: 'https://img01.ztat.net/article/spp-media-p1/7cd236bd94d1450aa14b2bd2476cf92d/32cfed082e7e4a25be18f783646c760a.jpg?imwidth=1800' },
    { id: 8, name: 'Nike SB Dunk Low', description: 'Chaussure de skate iconique', price: 110, image: 'https://img01.ztat.net/article/spp-media-p1/111e0630f197433b899fe4927923c623/65f2a02ab9ce4c88bb890283c7e8d102.jpg?imwidth=1800' },
    { id: 9, name: 'Asics Gel Lyte III', description: 'Confort avec la technologie Gel et design vintage', price: 100, image: 'https://img01.ztat.net/article/spp-media-p1/80639d5cd9914c3ea80d591ba30d8d81/6d414a13ec514c7caa9bbbc084025e2c.jpg?imwidth=1800' },
    { id: 10, name: 'Adidas Stan Smith', description: 'Classique et minimaliste', price: 85, image: 'https://img01.ztat.net/article/spp-media-p1/3a2eda6b4fab48f299d1b37f4bc56fbc/459f24c1ff0f4adfa06aeb88c3012ca2.jpg?imwidth=1800' },
    { id: 12, name: 'Saucony Jazz Original', description: 'Confort et performance pour les coureurs', price: 95, image: 'https://img01.ztat.net/article/spp-media-p1/1b42e133518c4676a505f1ba0c3abb28/69e5cc958d6547d39e21cf0f0b09653b.jpg?imwidth=1800' },
    { id: 13, name: 'Under Armour Curry One',description:'Chaussure de performance inspirée par le basket-ball', price: 130, image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRsOuKAwupLTx2X3AWEholRdpNyy_GCSKnqLdBFtKTSqPxYUUbmmYR81gHcqEcH-j0WNXaAUuG6tcCMD9_16qEH4yTdybgxy_v3-LQkTFiReSYIZ9vczX-thGuE6IFeHbwDJlGPmjaRlA&usqp=CAc' },
    { id: 14, name: 'FILA Disruptor 2',description:'Design rétro et moderne avec une semelle épaisse', price: 80, image: 'https://img01.ztat.net/article/spp-media-p1/f86e39b0f11e4d17ae1e6216491f7fe5/c5e8cd5be3a54a9aae0d59476ee40daf.jpg?imwidth=1800' },
    { id: 15, name: 'Converse Chuck Taylor',description:'Iconique et polyvalente', price: 61, image: 'https://img01.ztat.net/article/spp-media-p1/01c896b091984fc2bb2dc9b84313eb36/6f01d0ab5a65414faf625d8bac3d34b1.jpg?imwidth=1800' },

   ]; 
   app.get('/products/:id', (req, res) => { const product = products.find(p => p.id === parseInt(req.params.id)); if (product) { res.json(product); } else { res.status(404).json({ error: 'Product not found' }); } });





app.get('/products', (req, res) => {
  const sql = "SELECT * FROM products"; 
  db.query(sql, (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.post("/products", (req, res) => {
  const { name, price, description, image } = req.body;
  const sql =
    "INSERT INTO products (name, description, price, image) VALUES (? , ? , ?, ? )";
  db.query(sql, [name, description, price, image], (err, result) => {
    if (err) {
      return res.status(500).json({ err });
    } else {
      return res.status(200).json(result);
    }
  });
});

app.delete('/products/:id', (req, res) => {
  const sql = "DELETE FROM products WHERE id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error('Error deleting data:', err);
      return res.status(500).json("Error");
    }
    return res.status(200).json("Product deleted");
  });
});

app.put("/products/:id", (req, res) => {
  const { name, description, price, image } = req.body;
  const { id } = req.params;
  const sql =
    "UPDATE products SET name = ?, description = ?, price = ?, image = ? WHERE id = ?";
  db.query(sql, [name, description, price, image, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "ERREUR DU SERVEUR" });
    } else {
      return res.status(200).json(result);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});