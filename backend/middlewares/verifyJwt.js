const jwt = require("jsonwebtoken"); 

const verifyJwt = (req, res, next) => {
    const token = req.headers["access-token"];
    if (!token) {
      return res.json("We need a token, please provide it next time.");
    } else {
      jwt.verify(token, "jwtSecretKey", (err, decoded) => {
        if (err) {
          return res.json("Not Authenticated");
        } else {
          req.userId = decoded.id;
          next();
        }
      });
    }
  };

module.exports = verifyJwt;
