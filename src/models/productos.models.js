import { pool } from '../config/db.js';

export const crearProducto = async ({ nombre, precio, stock }) => {
  const [r] = await pool.execute(
    'INSERT INTO productos (nombre,precio,stock) VALUES (?,?,?)',
    [nombre, precio, stock]
  );
  return { id: r.insertId, nombre, precio, stock };
};

export const obtenerProducto = async (id) => {
  const [rows] = await pool.execute('SELECT * FROM productos WHERE id=?', [id]);
  return rows[0];
};

export const listarProducto = async () => {
  const [rows] = await pool.execute('SELECT * FROM productos ORDER BY id DESC');
  return rows;
};

export const actualizarProducto = async (id, { nombre, precio, stock }) => {
  await pool.execute(
    'UPDATE productos SET nombre=?, precio=?, stock=? WHERE id=?',
    [nombre, precio, stock, id]
  );
};

export const eliminarProducto = async (id) => {
  await pool.execute('DELETE FROM productos WHERE id=?', [id]);
};
