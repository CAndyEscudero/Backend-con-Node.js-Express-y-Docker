import { Router } from 'express';
import { requerirAuth } from '../middlewares/auth.js';
import { requerirRol } from '../middlewares/roles.js';
import { crearProducto, listarProductos, actualizarProducto, eliminarProducto } from '../models/producto.model.js';

const productosRouter = Router();

productosRouter.get('/productos', requerirAuth, async (_req, res, next) => {
  try {
    res.json(await listarProductos());
  } catch (e) {
    next(e);
  }
});

productosRouter.post('/productos', requerirAuth, requerirRol('admin', 'superAdmin'), async (req, res, next) => {
  try {
    res.status(201).json(await crearProducto(req.body));
  } catch (e) {
    next(e);
  }
});

productosRouter.put('/productos/:id', requerirAuth, requerirRol('admin', 'superAdmin'), async (req, res, next) => {
  try {
    await actualizarProducto(req.params.id, req.body);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

productosRouter.delete('/productos/:id', requerirAuth, requerirRol('admin', 'superAdmin'), async (req, res, next) => {
  try {
    await eliminarProducto(req.params.id);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

export default productosRouter;
