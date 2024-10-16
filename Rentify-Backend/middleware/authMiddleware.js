//authMiddleware.js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];

  // Check if the token is provided
  if (!token) return res.status(403).json({ msg: "No token provided" });

  // Extract the token part after 'Bearer '
  const bearerToken = token.split(" ")[1];
  if (!bearerToken) return res.status(403).json({ msg: "No token provided" });

  // Verify the token
  jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ msg: "Unauthorized" });

    // Attach user info to the request object
    req.user = { userId: decoded.userId };
    next();
  });
};

module.exports = authMiddleware;
