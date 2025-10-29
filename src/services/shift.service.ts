import { pool } from "../config/db";

interface Shift {
  user_id: number;
  day_of_week: number;
  start_time: string;
  end_time: string;
}

export const getByUser = async (userId: number) => {
  const [rows]: any = await pool.query("SELECT * FROM shifts WHERE user_id = ?", [userId]);
  return rows;
};

export const create = async (shift: Shift) => {
  const [result]: any = await pool.query("INSERT INTO shifts SET ?", [shift]);
  return { id: result.insertId, ...shift };
};

export const update = async (id: number, data: Partial<Shift>) => {
  await pool.query("UPDATE shifts SET ? WHERE id = ?", [data, id]);
  return { id, ...data };
};

export const remove = async (id: number) => {
  await pool.query("DELETE FROM shifts WHERE id = ?", [id]);
};
