import { pool } from "../config/db";

/**
 * Crea una venta y actualiza inventarios.
 * @param seller_id id del vendedor (users.id)
 * @param items [{ product_id, qty, price }]
 */
export const createSale = async (seller_id: number, items: any[]) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const total = items.reduce((sum, item) => sum + item.qty * item.price, 0);

    // Validar inventario antes de registrar la venta
    for (const item of items) {
      const { product_id, qty } = item;

      const [rows]: any = await conn.query(
        "SELECT quantity FROM inventory WHERE product_id = ? FOR UPDATE",
        [product_id]
      );

      if (!rows.length) {
        throw new Error(`El producto con ID ${product_id} no existe en inventario.`);
      }

      const currentQty = rows[0].quantity;

      if (currentQty < qty) {
        throw new Error(
          `Stock insuficiente para el producto ${product_id}. Disponible: ${currentQty}, solicitado: ${qty}`
        );
      }
    }

    // Crear venta
    const [saleResult]: any = await conn.query(
      "INSERT INTO sales (seller_id, total) VALUES (?, ?)",
      [seller_id, total]
    );
    const sale_id = saleResult.insertId;

    // Registrar items
    for (const item of items) {
      const { product_id, qty, price } = item;

      // Insertar detalle
      await conn.query(
        "INSERT INTO sale_items (sale_id, product_id, qty, price) VALUES (?, ?, ?, ?)",
        [sale_id, product_id, qty, price]
      );

      // Actualizar inventario
      await conn.query(
        "UPDATE inventory SET quantity = quantity - ? WHERE product_id = ?",
        [qty, product_id]
      );

      // Registrar movimiento
      await conn.query(
        `INSERT INTO inventory_movements (product_id, quantity_change, reason, reference_id, created_by)
         VALUES (?, ?, 'sale', ?, ?)`,
        [product_id, -qty, sale_id, seller_id]
      );
    }

    await conn.commit();

    const [saleData]: any = await conn.query(
      "SELECT * FROM sales WHERE id = ?",
      [sale_id]
    );

    const [itemsData]: any = await conn.query(
      "SELECT * FROM sale_items WHERE sale_id = ?",
      [sale_id]
    );

    return { sale: saleData[0], items: itemsData };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

export const getAll = async () => {
  const [rows] = await pool.query(`
    SELECT s.*, u.full_name AS seller_name
    FROM sales s
    LEFT JOIN users u ON s.seller_id = u.id
    ORDER BY s.sale_time DESC
  `);
  return rows;
};

export const getById = async (id: number) => {
  const [sales]: any = await pool.query(
    "SELECT * FROM sales WHERE id = ?",
    [id]
  );
  if (!sales.length) return null;

  const [items]: any = await pool.query(
    "SELECT * FROM sale_items WHERE sale_id = ?",
    [id]
  );

  return { ...sales[0], items };
};

export const revertSale = async (saleId: number, userId: number) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // 1. Verificar venta existente
    const [sales]: any = await conn.query(
      "SELECT * FROM sales WHERE id = ? FOR UPDATE",
      [saleId]
    );

    if (!sales.length) throw new Error(`Venta ${saleId} no encontrada.`);
    const sale = sales[0];

    if (sale.status === "canceled")
      throw new Error(`La venta ${saleId} ya está cancelada.`);

    // 2. Obtener los items vendidos
    const [items]: any = await conn.query(
      "SELECT * FROM sale_items WHERE sale_id = ?",
      [saleId]
    );

    // 3. Restaurar inventario
    for (const item of items) {
      const { product_id, qty } = item;

      await conn.query(
        "UPDATE inventory SET quantity = quantity + ? WHERE product_id = ?",
        [qty, product_id]
      );

      await conn.query(
        `INSERT INTO inventory_movements (product_id, quantity_change, reason, reference_id, created_by)
         VALUES (?, ?, 'sale_revert', ?, ?)`,
        [product_id, qty, saleId, userId]
      );
    }

    // 4. Marcar la venta como cancelada
    await conn.query(
      "UPDATE sales SET status = 'canceled' WHERE id = ?",
      [saleId]
    );

    await conn.commit();

    return { message: `Venta ${saleId} revertida exitosamente.` };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};
