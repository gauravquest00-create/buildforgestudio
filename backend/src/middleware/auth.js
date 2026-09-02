import { verifyToken } from '../utils/jwt.js';
import { Admin } from '../models/Admin.js';

export const protectAdmin = async (req, res, next) => {
  try {
    let token = null;

    // 1. Check HTTP-only cookie first
    if (req.cookies && req.cookies.auth_token) {
      token = req.cookies.auth_token;
    }
    // 2. Check Authorization Bearer header fallback
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please sign in to access the studio admin.',
      });
    }

    const decoded = verifyToken(token);
    const admin = await Admin.findById(decoded.id).select('-password');

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Administrator account no longer exists or session expired.',
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired session token.',
    });
  }
};
