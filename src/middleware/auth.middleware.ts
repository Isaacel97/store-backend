import { Request, Response, NextFunction } from 'express';
import { JwtUtils } from '../utils/jwt';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Missing token' });

  const token = authHeader.split(' ')[1];
  const decoded = JwtUtils.verifyToken(token);

  if (!decoded) return res.status(401).json({ error: 'Invalid token' });

  (req as any).user = decoded;
  next();
};
