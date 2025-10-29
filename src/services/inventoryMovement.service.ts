import { pool } from "../config/db";

interface QueryOptions {
  limit?: number;
  offset?: number;
}

/**
 * Obtiene el historial completo de movimientos con detalles de producto y usuario
 */
export const getAll = async (options: QueryOptions) => {
  const { limit = 50, offset = 0 } = options;

  const [rows]: any = await pool.query(
    `
    SELECT
      m.id,
      m.product_id,
      p.name AS product_name,
      p.sku,
      m.quantity_change,
      m.reason,
      m.reference_id,
      u.full_name AS created_by,
      m.created_at
    FROM inventory_movements m
    LEFT JOIN products p ON m.product_id = p.id
    LEFT JOIN users u ON m.created_by = u.id
    ORDER BY m.created_at DESC
    LIMIT ? OFFSET ?
    `,
    [limit, offset]
  );

  return rows;
};

/**
 * Obtiene movimientos específicos de un producto
 */
export const getByProduct = async (productId: number) => {
  const [rows]: any = await pool.query(
    `
    SELECT
      m.id,
      m.product_id,
      p.name AS product_name,
      p.sku,
      m.quantity_change,
      m.reason,
      m.reference_id,
      u.full_name AS created_by,
      m.created_at
    FROM inventory_movements m
    LEFT JOIN products p ON m.product_id = p.id
    LEFT JOIN users u ON m.created_by = u.id
    WHERE m.product_id = ?
    ORDER BY m.created_at DESC
    `,
    [productId]
  );

  return rows;
};
