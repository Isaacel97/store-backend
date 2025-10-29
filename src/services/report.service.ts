import { pool } from "../config/db";

/**
 * Ventas diarias
 */
export const getDailySales = async (from?: string, to?: string) => {
  let query = `
    SELECT DATE(sale_time) as date, SUM(total) as total_sales, COUNT(*) as total_orders
    FROM sales
    WHERE status='completed'
  `;
  const params: any[] = [];

  if (from && to) {
    query += " AND DATE(sale_time) BETWEEN ? AND ?";
    params.push(from, to);
  }

  query += " GROUP BY DATE(sale_time) ORDER BY DATE(sale_time) DESC";

  const [rows]: any = await pool.query(query, params);
  return rows;
};

/**
 * Productos con stock bajo
 */
export const getLowStock = async (threshold: number = 5) => {
  const [rows]: any = await pool.query(
    `
    SELECT p.id, p.name, p.sku, i.quantity
    FROM inventory i
    JOIN products p ON i.product_id = p.id
    WHERE i.quantity <= ?
    ORDER BY i.quantity ASC
    `,
    [threshold]
  );
  return rows;
};

/**
 * Ventas por vendedor
 */
export const getSalesBySeller = async (from?: string, to?: string) => {
  let query = `
    SELECT u.id AS seller_id, u.full_name, COUNT(s.id) as total_sales, SUM(s.total) as total_amount
    FROM sales s
    JOIN users u ON s.seller_id = u.id
    WHERE s.status='completed'
  `;
  const params: any[] = [];

  if (from && to) {
    query += " AND DATE(s.sale_time) BETWEEN ? AND ?";
    params.push(from, to);
  }

  query += " GROUP BY u.id ORDER BY total_amount DESC";

  const [rows]: any = await pool.query(query, params);
  return rows;
};

/**
 * Historial reciente de movimientos de inventario
 */
export const getInventoryMovements = async (limit: number = 50, offset: number = 0) => {
  const [rows]: any = await pool.query(
    `
    SELECT m.id, p.name AS product_name, p.sku, m.quantity_change, m.reason, m.reference_id, u.full_name AS created_by, m.created_at
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
