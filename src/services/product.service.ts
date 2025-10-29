import { pool } from "../config/db";

export const getAll = async () => {
  const [rows] = await pool.query("SELECT * FROM products");
  return rows;
};

export const getById = async (id: number) => {
  const [rows]: any = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
  return rows[0];
};

export const create = async (data: any) => {
  const { sku, name, image_url, price, type, status } = data;
  const [result]: any = await pool.query(
    "INSERT INTO products (sku, name, image_url, price, type, status) VALUES (?, ?, ?, ?, ?, ?)",
    [sku, name, image_url, price, type, status || "active"]
  );
  // crear registro en inventario
  await pool.query("INSERT INTO inventory (product_id, quantity) VALUES (?, 0)", [result.insertId]);
  return { id: result.insertId, ...data };
};

export const update = async (id: number, data: any) => {
  const { name, image_url, price, type, status } = data;
  await pool.query(
    "UPDATE products SET name=?, image_url=?, price=?, type=?, status=? WHERE id=?",
    [name, image_url, price, type, status, id]
  );
  return getById(id);
};

export const remove = async (id: number) => {
  await pool.query("DELETE FROM inventory WHERE product_id=?", [id]);
  await pool.query("DELETE FROM products WHERE id=?", [id]);
  return true;
};

export const adjustStock = async (
  product_id: number,
  quantity_change: number,
  reason: string,
  user_id: number
) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // actualizar inventario
    await conn.query(
      "UPDATE inventory SET quantity = quantity + ? WHERE product_id = ?",
      [quantity_change, product_id]
    );

    // registrar movimiento
    await conn.query(
      `INSERT INTO inventory_movements (product_id, quantity_change, reason, created_by)
       VALUES (?, ?, ?, ?)`,
      [product_id, quantity_change, reason, user_id]
    );

    // confirmar
    await conn.commit();

    const [stock]: any = await conn.query(
      "SELECT quantity FROM inventory WHERE product_id = ?",
      [product_id]
    );
    return { product_id, current_stock: stock[0]?.quantity };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};
