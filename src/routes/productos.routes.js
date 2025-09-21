import { Router } from 'express';
import { requerirAutenticacion } from '../middlewares/auth.js';
import { requerirRol } from '../middlewares/roles.js';
import { crearProducto, listarProducto,actualizarProducto, eliminarProducto } from '../models/productos.models.js';

const productosRouter = Router();

productosRouter.get('/productos', requerirAutenticacion, async (_req, res, next) => {
  try {
    res.json(await listarProducto());
  } catch (e) {
    next(e);
  }
});

productosRouter.post('/productos', requerirAutenticacion, requerirRol('admin', 'superAdmin'), async (req, res, next) => {
  try {
    res.status(201).json(await crearProducto(req.body));
  } catch (e) {
    next(e);
  }
});

productosRouter.put('/productos/:id', requerirAutenticacion, requerirRol('admin', 'superAdmin'), async (req, res, next) => {
  try {
    await actualizarProducto(req.params.id, req.body);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

productosRouter.delete('/productos/:id', requerirAutenticacion, requerirRol('admin', 'superAdmin'), async (req, res, next) => {
  try {
    await eliminarProducto(req.params.id);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

export default productosRouter;
