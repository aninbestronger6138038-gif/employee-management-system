import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const verifyUser = async (req , res , next) => {
    try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Token not provided or invalid format'
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Token not provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        error: 'Token not valid'
      });
    }

    const user = await User.findById(decoded._id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("AUTH MIDDLEWARE ERROR OBJECT:", error);
  console.error("AUTH MIDDLEWARE ERROR STACK:", error.stack);

  return res.status(500).json({
    success: false,
    error: error.message
  });
  }
};

export default verifyUser;