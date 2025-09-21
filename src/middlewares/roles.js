export const requerirRol = (...rol) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'No autenticado' });
  if (!rol.includes(req.usuario.rol)) return res.status(403).json({ error: 'Sin permisos' });
  next();
};
