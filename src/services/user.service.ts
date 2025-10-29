import { pool } from "../config/db";

export const getUsers = async (type: string) => {
  if (type === "all") {
    const [rows] = await pool.query("SELECT id, username, email, full_name, role, created_at FROM users");
    return rows;
  } else {
    const [rows] = await pool.query("SELECT id, username, email, full_name, role, created_at FROM users WHERE role = ?", [type]);
    return rows;
  }
};
