const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const Authorization = req.headers.Authorization || req.headers.authorization;

  if (Authorization && Authorization.startsWith("Bearer")) {
    const token = Authorization.split(" ")[1];
    jwt.verify(token, "masai", (err, user) => {
      if (err) {
        res.status(400).json({
          status: "fail",
          message: "Authentication failed.Invalid token",
        });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(400).json({
      message: "Authentication failed , please try again....",
    });
  }
};

module.exports = { authMiddleware };
