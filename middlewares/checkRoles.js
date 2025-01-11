const jwt = require("jsonwebtoken");

exports.checkRoles = (allowedRoles) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "Access denied. No token provided." });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const userRoles = decoded.roles;
      const hasAccess = allowedRoles.some((role) => userRoles.includes(role));

      if (!hasAccess) {
        return res.status(403).json({ success: false, message: "Access denied. Insufficient permissions." });
      }

      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).json({ success: false, message: "Invalid token." });
    }
  };
};
