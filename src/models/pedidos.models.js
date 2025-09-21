import { pool } from '../config/db.js';

export async function crearPedido(usuarioId, items) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [r] = await conn.execute('INSERT INTO pedidos (usuario_id) VALUES (?)', [usuarioId]);
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
  const [pedido] = await pool.execute(
    `SELECT p.id, p.usuario_id, p.created_at, u.nombre AS usuario_nombre
     FROM pedidos p JOIN usuario u ON u.id = p.usuario_id
     WHERE p.id = ?`,
    [pedidoId]
  );
  if (!pedido.length) throw Object.assign(new Error('Pedido no encontrado'), { status: 404 });

  const [items] = await pool.execute(
    `SELECT i.productos_id AS producto_id, prod.nombre, i.qty AS cantidad, i.precio AS precio_unitario,
            (i.qty * i.precio) AS subtotal
     FROM pedidos_items i
     JOIN productos prod ON prod.id = i.productos_id
     WHERE i.pedidos_id = ?`,
    [pedidoId]
  );
  const total = items.reduce((acc, it) => acc + Number(it.subtotal), 0);
  return { ...pedido[0], items, total };
}

export async function listarPedidosConTotales() {
  const [rows] = await pool.execute(`
    SELECT p.id, p.created_at, u.id AS usuario_id, u.nombre AS usuario_nombre,
           SUM(i.qty * i.precio) AS total
    FROM pedidos p
    JOIN usuario u ON u.id = p.usuario_id
    JOIN pedidos_items i ON i.pedidos_id = p.id
    GROUP BY p.id, p.created_at, u.id, u.nombre
    ORDER BY p.id DESC
  `);
  return rows;
}
