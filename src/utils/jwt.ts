import jwt from 'jsonwebtoken';
import fs from "fs";
import path from "path";

const privateKey = fs.readFileSync(path.join(__dirname, "../keys/private.pem"));
const publicKey = fs.readFileSync(path.join(__dirname, "../keys/public.pem"));


export const JwtUtils = {
  generateToken(payload: object) {
    return jwt.sign(payload, privateKey, { 
      algorithm: 'RS256',
      expiresIn: '6h' 
    });
  },

  verifyToken(token: string) {
    try {
      return jwt.verify(token, publicKey, { algorithms: ['RS256'] });
    } catch {
      return null;
    }
  },
};
