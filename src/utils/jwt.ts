import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
const JWT_EXPIRES = '8h';

export const JwtUtils = {
  generateToken(payload: object) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
  },

  verifyToken(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch {
      return null;
    }
  },
};
