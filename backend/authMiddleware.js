// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function authenticatee(req, res, next) {
  try {
    // Get token from various sources
    const token = req.headers.authorization?.split(' ')[1] || 
                 req.cookies?.token || 
                 req.query?.token;

    if (!token) {
      return res.status(401).json({ 
        error: 'Authentication required',
        message: 'No token provided'
      });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ 
          error: 'Invalid token',
          message: err.message.includes('expired') 
            ? 'Token has expired' 
            : 'Invalid token'
        });
      }

      // Attach user to request
      req.user = decoded;
      next();
    });

  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ 
      error: 'Authentication failed',
      message: 'Internal server error'
    });
  }
};