import { Router } from 'express';
import { requerirAutenticacion } from '../middlewares/auth.js';
import { requerirRol } from '../middlewares/roles.js';
import { crearPedido, obtenerPedidoCompleto, listarPedidosConTotales } from '../models/pedidos.models.js';

const pedidosRouter = Router();

pedidosRouter.post('/pedidos', requerirAutenticacion, requerirRol('usuario', 'admin', 'superAdmin'), async (req, res, next) => {
  try {
    res.status(201).json(await crearPedido(req.user.id, req.body.items || []));
  } catch (e) {
    next(e);
  }
});

pedidosRouter.get('/pedidos', requerirAutenticacion, requerirRol('admin', 'superAdmin'), async (_req, res, next) => {
  try {
    res.json(await obtenerPedidoCompleto());
  } catch (e) {
    next(e);
  }
});

pedidosRouter.get('/pedidos/:id', requerirAutenticacion, async (req, res, next) => {
  try {
    res.json(await listarPedidosConTotales(req.params.id));
  } catch (e) {
    next(e);
  }
});

export default pedidosRouter;
