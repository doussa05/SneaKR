const jwt = require('jsonwebtoken');
const mysql = require('mysql');

// Connexion à la base de données
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "signup",
  port: 3306
});

const verifyJwt = (req, res, next) => {
    const token = req.headers["authorization"] && req.headers["authorization"].replace('Bearer ', '');
    if (!token) {
      console.log("No token provided.");
      return res.status(403).json("We need a token, please provide it next time.");
    } else {
      jwt.verify(token, "jwtSecretKey", (err, decoded) => {
        if (err) {
          console.log("Failed to authenticate token.");
          return res.status(401).json("Not Authenticated");
        } else {
          const sql = 'SELECT id, name, email FROM login WHERE token = ?';
          db.query(sql, [token], (error, results) => {
            if (error) {
              console.log("Database query error: ", error);
              return res.status(500).json({ error: error.message });
            }
            if (results.length > 0) {
              req.user = results[0]; // Stocke les informations de l'utilisateur dans la requête
              next();
            } else {
              console.log("User not found.");
              return res.status(404).json("User not found");
            }
          });
        }
      });
    }
};

module.exports = verifyJwt;
