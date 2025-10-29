import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './config/db';
import {
  authRoutes,
  productRoutes,
  saleRoutes,
  inventoryMovementRoutes,
  shiftRoutes,
  attendanceRoutes,
  reportRoutes,
  inventoryRoutes,
  userRoutes,
} from './routes';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/movements', inventoryMovementRoutes);
app.use('/api/shifts', shiftRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/users', userRoutes);

app.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT NOW() as time');
    res.json({ status: 'API running', db_time: rows });
  } catch (err) {
    res.status(500).json({ error: 'Database connection failed', details: err });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
