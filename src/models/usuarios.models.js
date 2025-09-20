import { pool } from '../config/db.js';

export async function crearUsuario({ nombre, email, contrasena_hash, rol }) {
  const [r] = await pool.execute(
    'INSERT INTO usuario (nombre,email,contrasena_hash,rol) VALUES (?,?,?,?)',
    [nombre, email, contrasena_hash, rol]
  );
  return { id: r.insertId, nombre, email, rol };
}

export async function buscarPorEmail(email) {
  const [rows] = await pool.execute('SELECT * FROM usuario WHERE email=?', [email]);
  return rows[0];
}


export async function listaUsuarioConRecuentoDePedidos() {
  const [rows] = await pool.execute(`
    SELECT 
      u.id, 
      u.nombre, 
      u.email, 
      u.rol, 
      COUNT(p.id) AS cantidad_pedidos
    FROM usuario u
    LEFT JOIN pedidos p ON p.usuario_id = u.id
    GROUP BY u.id, u.nombre, u.email, u.rol
    ORDER BY cantidad_pedidos DESC
  `);
  return rows;
}