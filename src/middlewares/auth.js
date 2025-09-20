import { verificarToken } from '../utils/jwt.js';

export const requerirAutenticacion = (req, res, next) => {
  const h = req.headers.authorization || '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Token requerido' });
  try {
    req.user = verificarToken(token); // { id, role }
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
};
