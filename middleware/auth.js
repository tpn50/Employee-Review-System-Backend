const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  try {
    let token = null;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payload;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "validation failed",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Admin access is required.",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "User is not admin",
    });
  }
};
