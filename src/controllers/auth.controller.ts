import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.model';
import { JwtUtils } from '../utils/jwt';

export const AuthController = {
  async register(req: Request, res: Response) {
    try {
      const { username, email, password, full_name, role } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: 'username y password son requeridos' });
      }

      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({ error: 'Formato de correo electrónico inválido' });
        }

        const existingEmail = await UserModel.findByEmail(email);
        if (existingEmail) {
          return res.status(409).json({ error: 'El correo electrónico ya está en uso' });
        }
      }

      if (role !== 'admin' && role !== 'seller' && role !== 'viewer') {
        return res.status(400).json({ error: 'Rol inválido' });
      }

      if (password) {
        const passwordRegex = /^(?=.{8,64}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\[\]{};:'",.<>\/?\\|`~]).*$/;
        if (!passwordRegex.test(password)) {
          return res.status(400).json({ error: 'La contraseña debe tener entre 8 y 64 caracteres e incluir mayúsculas, minúsculas, números y caracteres especiales' });
        }
      }

      const existing = await UserModel.findByUsername(username);
      if (existing) {
        return res.status(409).json({ error: 'El nombre de usuario ya está en uso' });
      }

      const password_hash = await bcrypt.hash(password, 10);
      const userId = await UserModel.create({ username, email, password_hash, full_name, role });

      res.status(201).json({ message: `Usuario #${userId} registrado con éxito`, status: 201 });
    } catch (err) {
      console.error('Register error:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: 'username y password son requeridos' });
      }

      const user = await UserModel.findByUsername(username);
      if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      const valid = await bcrypt.compare(password, user.password_hash);
      if (!valid) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      const token = JwtUtils.generateToken({
        id: user.id,
        username: user.username,
        role: user.role,
      });

      const data = {
        id: user.id,
        username: user.username,
        role: user.role,
        token
      };

      res.json({ message: 'Login exitoso', data });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
};
