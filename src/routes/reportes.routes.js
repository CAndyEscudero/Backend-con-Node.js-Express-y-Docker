import { Router } from 'express';
import { requerirAutenticacion} from '../middlewares/auth.js';
import { requerirRol } from '../middlewares/roles.js';
import { pool } from '../config/db.js';

const reportesRouter = Router();

reportesRouter.get('/reportes/pedidos-por-usuario/:usuarioId', requerirAutenticacion, requerirRol('admin', 'superAdmin'), async (req, res, next) => {
  try {
    const [rows] = await pool.execute(`
      SELECT 
        p.id, 
        p.creado_en, 
        SUM(ip.cantidad * ip.precio) AS total
      FROM pedidos p
      JOIN items_pedido ip ON ip.pedido_id = p.id
      WHERE p.usuario_id = ?
      GROUP BY p.id, p.creado_en
      ORDER BY p.creado_en DESC
    `, [req.params.usuarioId]);

    res.json(rows);
  } catch (e) {
    next(e);
  }
});

export default reportesRouter;
