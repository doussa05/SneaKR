const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken"); 
const bodyParser = require('body-parser');
const PORT = 3001;
const verifyJwt = require('./middlewares/verifyJwt.js')
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
  const sql = "INSERT INTO login(`name`, `email`, `password`, `token`) VALUES(?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.password,
    '' 
  ];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json({error: err });
    }
    return res.json({ success: 'Signed up with success !' });
  });
});

app.get('/checkauth', verifyJwt, (req, res) => {
  return res.json("Authenticated");
});

app.post('/login', (req, res) => {
  const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      return res.json({ error: err });
    }
    if (data.length > 0) {
      const id = data[0].id;
      const token = jwt.sign({ id }, "jwtSecretKey", { expiresIn: '1h' });

      // Mise à jour du token dans la base de données
      const updateTokenSql = "UPDATE login SET token = ? WHERE id = ?";
      db.query(updateTokenSql, [token, id], (err, updateResult) => {
        if (err) {
          return res.json({ error: err });
        }
        return res.json({ Login: true, token, data });
      });
    } else {
      return res.json("User doesn't exist or incorrect password");
    }
  });
});


app.get('/products', (req, res) => {
  const sql = "SELECT * FROM products"; 
  db.query(sql, (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});
app.get('/search', (req, res) => {
  const searchTerm = req.query.term;
  const sql = "SELECT * FROM products WHERE name LIKE ? OR description LIKE ?";
  const values = [`%${searchTerm}%`, `%${searchTerm}%`];

  db.query(sql, values, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la recherche' });
    }
    return res.status(200).json(data);
  });
});

// app.post('/products', (req, res) => {
//   const sql = "INSERT INTO products(`name`, `description`, `prix`, `image`) VALUES(?)";
//   const values = [
//     req.body.name,
//     description,
//     prix,
//     image
//   ];
//   db.query(sql, [values], (err, data) => {
//     if (err) {
//       return res.json("Error");
//     }
//     return res.json(data);
//   });
// });
app.post("/createItem", (req, res) => {
  const { name, prix, description, image} = req.body;
  const sql =
    "INSERT INTO products (name,description ,prix, image) VALUES (? , ? , ?, ? )";
  db.query(
    sql,
    [name, description, prix, image],
    (err, result) => {
      if (err) {
        return res.status(500).json({ err });
      } else {
        return res.status(200).json(result);
      }
    }
  );
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
// app.put('/products/:id', (req, res) => { const sql = "UPDATE products SET name = ?, description = ?, prix = ?, image = ? WHERE id = ?"; 
//   const values = [ name, description, prix, image, req.params.id ]; 
//   db.query(sql, values, (err, data) => { 
//     if (err) { console.error('Error updating data:', err); 
//    return res.status(500).json("Error"); } 
//    return res.status(200).json("Product updated"); }); });

 app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
 });


app.put("/products/:id", (req, res) => {
  const { name,description, prix, image,  } = req.body;
  const { id } = req.params;
  const sql =
    "UPDATE products SET name = ?, description = ?, prix = ?, image= ? , WHERE id = ?";
  db.query(
    sql,
    [name,description, prix, image, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "ERREUR DU SERVEUR" });
      } else {
        return res.status(200).json(result);
      }
    }
  );
});