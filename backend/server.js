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
          } res.status(200).json(results[0]); }); });
         // Route pour ajouter un article à la wishlist 
         app.post('/wishlist', verifyJwt, (req, res) => { const userId = req.user.id; const { name, image, id: productId } = req.body; if (!productId || !name || !image) { return res.status(400).json({ message: 'Product ID, name, and image are required' }); } const sql = 'INSERT INTO wishlist (id, name, image, user_id) VALUES (?, ?, ?, ?)'; db.query(sql, [productId, name, image, userId], (err, result) => { if (err) { console.error('Database error:', err); return res.status(500).json({ message: 'Erreur serveur' }); } res.status(200).json({ message: 'Article ajouté à la wishlist' }); }); });
          // Route pour récupérer les articles de la wishlist 
          app.get('/wishlist', verifyJwt, (req, res) => { const userId = req.user.id; const sql = 'SELECT id, name, image FROM wishlist WHERE user_id = ?'; db.query(sql, [userId], (err, results) => { if (err) { console.error('Database error:', err); // Log plus détaillé
           return res.status(500).json({ message: 'Erreur serveur' }); } res.status(200).json(results); }); });
          
app.get('/wishlist', verifyJwt, (req, res) => { const userId = req.user.id; const sql = 'SELECT id, name, image FROM wishlist WHERE user_id = ?'; db.query(sql, [userId], (err, results) => { if (err) { console.error('Database error:', err); return res.status(500).json({ message: 'Erreur serveur' }); } res.status(200).json(results); }); });
// route la bare de recherche
app.get('/search', (req, res) => { const searchTerm = req.query.term; const sql = 'SELECT * FROM products WHERE name LIKE ?'; db.query(sql, [`%${searchTerm}%`], (err, results) => { if (err) { console.error('Database error:', err); return res.status(500).json({ message: 'Erreur serveur' }); } res.status(200).json(results); }); });
// routes des produits
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