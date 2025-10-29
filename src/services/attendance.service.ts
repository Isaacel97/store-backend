import { pool } from "../config/db";

interface AttendanceFilter {
  userId?: number;
  from?: string;
  to?: string;
}

export const clockIn = async (userId: number) => {
  const now = new Date();

  // Verificar si ya tiene check-in activo (sin clock_out)
  const [existing]: any = await pool.query(
    "SELECT * FROM attendance WHERE user_id = ? AND clock_out IS NULL",
    [userId]
  );

  if (existing.length > 0) {
    return { message: "User already clocked in" };
  }

  const [result]: any = await pool.query(
    "INSERT INTO attendance (user_id, clock_in) VALUES (?, ?)",
    [userId, now]
  );

  return { id: result.insertId, userId, clock_in: now };
};

export const clockOut = async (userId: number) => {
  const now = new Date();
  const [rows]: any = await pool.query(
    "SELECT * FROM attendance WHERE user_id = ? AND clock_out IS NULL ORDER BY id DESC LIMIT 1",
    [userId]
  );

  if (rows.length === 0) {
    return { message: "No active check-in found" };
  }

  const attendanceId = rows[0].id;
  await pool.query("UPDATE attendance SET clock_out = ? WHERE id = ?", [now, attendanceId]);

  return { id: attendanceId, userId, clock_out: now };
};

export const getHistory = async (filters: AttendanceFilter) => {
  let query = `
    SELECT a.*, u.full_name
    FROM attendance a
    JOIN users u ON u.id = a.user_id
    WHERE 1=1
  `;
  const params: any[] = [];

  if (filters.userId) {
    query += " AND a.user_id = ?";
    params.push(filters.userId);
  }

  if (filters.from && filters.to) {
    query += " AND DATE(a.clock_in) BETWEEN ? AND ?";
    params.push(filters.from, filters.to);
  }

  query += " ORDER BY a.clock_in DESC";

  const [rows]: any = await pool.query(query, params);
  return rows;
};
