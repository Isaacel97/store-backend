import { pool } from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface User {
  id?: number;
  username: string;
  email?: string;
  password_hash: string;
  full_name?: string;
  role?: 'admin' | 'seller' | 'viewer';
}

export const UserModel = {
  async findByUsername(username: string): Promise<User | null> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE username = ?', [username]);
    const row = rows[0] as unknown as User | undefined;
    return row ?? null;
  },

  async findByEmail(email: string): Promise<User | null> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE email = ?', [email]);
    const row = rows[0] as unknown as User | undefined;
    return row ?? null;
  },

  async create(user: User): Promise<number> {
    const { username, email, password_hash, full_name, role } = user;
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO users (username, email, password_hash, full_name, role) VALUES (?, ?, ?, ?, ?)',
      [username, email, password_hash, full_name, role || 'seller']
    );
    return result.insertId;
  },
};
