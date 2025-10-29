import { pool } from "../config/db";

interface InventoryQueryOptions {
  productId?: number;
}

/**
 * Obtener stock actual de todos los productos
 */
export const getInventory = async (options: InventoryQueryOptions = {}) => {
  const { productId } = options;

  let query = `
    SELECT i.id, i.product_id, p.name AS product_name, p.sku, i.quantity
    FROM inventory i
    JOIN products p ON i.product_id = p.id
  `;

  const params: any[] = [];

  if (productId) {
    query += " WHERE i.product_id = ?";
    params.push(productId);
  }

  query += " ORDER BY p.name ASC";

  const [rows]: any = await pool.query(query, params);
  return rows;
};

/**
 * Obtener stock de un solo producto
 */
export const getInventoryByProduct = async (productId: number) => {
  const [rows]: any = await pool.query(
    `
    SELECT i.id, i.product_id, p.name AS product_name, p.sku, i.quantity
    FROM inventory i
    JOIN products p ON i.product_id = p.id
    WHERE i.product_id = ?
    `,
    [productId]
  );
  return rows.length ? rows[0] : null;
};
