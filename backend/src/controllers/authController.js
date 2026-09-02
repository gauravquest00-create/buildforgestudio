import { Admin } from '../models/Admin.js';
import { generateToken, setAuthCookie, clearAuthCookie } from '../utils/jwt.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password',
      });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() }).select('+password');

    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Access denied.',
      });
    }

    // Update last login timestamp
    admin.lastLogin = new Date();
    await admin.save({ validateBeforeSave: false });

    // Generate JWT and set secure HTTP-only cookie
    const token = generateToken({ id: admin._id, email: admin.email, role: admin.role });
    setAuthCookie(res, token);

    res.status(200).json({
      success: true,
      message: 'Authentication successful',
      token, // Also return token in body for Bearer fallback when cookies are blocked
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        lastLogin: admin.lastLogin,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      admin: {
        id: req.admin._id,
        name: req.admin.name,
        email: req.admin.email,
        role: req.admin.role,
        lastLogin: req.admin.lastLogin,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    clearAuthCookie(res);
    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    next(error);
  }
};
