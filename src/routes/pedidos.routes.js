import { Router } from 'express';
import { requerirAuth } from '../middlewares/auth.js';
import { requerirRol } from '../middlewares/roles.js';
import { crearPedido, obtenerPedidoConDetalles, listarPedidosConTotales } from '../models/pedido.model.js';

const pedidosRouter = Router();

pedidosRouter.post('/pedidos', requerirAuth, requerirRol('usuario', 'admin', 'superAdmin'), async (req, res, next) => {
  try {
    res.status(201).json(await crearPedido(req.user.id, req.body.items || []));
  } catch (e) {
    next(e);
  }
});

pedidosRouter.get('/pedidos', requerirAuth, requerirRol('admin', 'superAdmin'), async (_req, res, next) => {
  try {
    res.json(await listarPedidosConTotales());
  } catch (e) {
    next(e);
  }
});

pedidosRouter.get('/pedidos/:id', requerirAuth, async (req, res, next) => {
  try {
    res.json(await obtenerPedidoConDetalles(req.params.id));
  } catch (e) {
    next(e);
  }
});

export default pedidosRouter;
