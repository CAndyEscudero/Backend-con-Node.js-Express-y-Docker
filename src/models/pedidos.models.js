import { pool } from '../config/db.js';

export async function crearPedido(userId, items) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [r] = await conn.execute('INSERT INTO pedidos (user_id) VALUES (?)', [userId]);
    const pedidoId = r.insertId;

    for (const { productos_id, qty, precio } of items) {
      await conn.execute(
        'INSERT INTO pedidos_items (pedidos_id, productos_id, qty, precio) VALUES (?,?,?,?)',
        [pedidoId, productos_id, qty, precio]
      );
      await conn.execute('UPDATE productos SET stock = stock - ? WHERE id=?', [qty, productos_id]);
    }

    await conn.commit();
    return { id: pedidoId };
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
}

export async function obtenerPedidoCompleto(pedidoId) {
  const [pedidoRows] = await pool.execute(
    'SELECT o.id, o.user_id, o.created_at, u.name as user_name FROM orders o JOIN users u ON u.id=o.user_id WHERE o.id=?',
    [pedidoId]
  );
    if (!pedidoRows.length) {
    console.warn(`[${new Date().toISOString()}] Pedido ${pedidoId} no encontrado`);
    throw new Error('Pedido no encontrado'); // si no se encuentra el producto lanza error 404
  }

  const [items] = await pool.execute(
    `
    SELECT 
      oi.product_id,
      p.name                AS nombre_producto,
      oi.qty                AS cantidad,
      oi.price              AS precio_unitario,
      (oi.qty * oi.price)   AS subtotal
    FROM order_items oi
    JOIN products p ON p.id = oi.product_id
    WHERE oi.order_id = ?
    `,
    [pedidoId]
  );

  const total = items.reduce((acc, it) => acc + Number(it.subtotal), 0);

  return { ...pedidoRows[0], items, total };
}

export async function listarPedidosConTotales() {
  const [rows] = await pool.execute(`
    SELECT 
      o.id,
      o.created_at,
      u.id       AS usuario_id,
      u.name     AS nombre_usuario,
      SUM(oi.qty * oi.price) AS total
    FROM orders o
    JOIN users u ON u.id = o.user_id
    JOIN order_items oi ON oi.order_id = o.id
    GROUP BY o.id, o.created_at, u.id, u.name
    ORDER BY o.id DESC
  `);

  return rows;
}
