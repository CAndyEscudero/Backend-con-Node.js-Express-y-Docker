import { pool } from '../config/db.js';

export async function createUser({ name, email, password_hash, role }) {
  const [r] = await pool.execute(
    'INSERT INTO users (name,email,password_hash,role) VALUES (?,?,?,?)',
    [name, email, password_hash, role]
  );
  return { id: r.insertId, name, email, role };
}

export async function findByEmail(email) {
  const [rows] = await pool.execute('SELECT * FROM users WHERE email=?', [email]);
  return rows[0];
}


export async function listUsersWithOrderCount() {
  const [rows] = await pool.execute(`
    SELECT u.id, u.name, u.email, u.role, COUNT(o.id) AS ordersCount
    FROM users u
    LEFT JOIN orders o ON o.user_id = u.id
    GROUP BY u.id
    ORDER BY ordersCount DESC
  `);
  return rows;
}
