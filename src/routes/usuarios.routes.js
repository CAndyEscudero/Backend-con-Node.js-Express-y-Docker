import { Router } from 'express';
import { requerirAuth } from '../middlewares/auth.js';
import { requerirRol } from '../middlewares/roles.js';
import { listaUsuariosConRecuentoDePedidos, crearUsuario } from '../models/usuario.model.js';

const usuariosRouter = Router();

usuariosRouter.get('/usuarios', requerirAuth, requerirRol('superAdmin'), async (req, res, next) => {
  try {
    res.json(await listaUsuariosConRecuentoDePedidos());
  } catch (e) {
    next(e);
  }
});

usuariosRouter.post('/usuarios', requerirAuth, requerirRol('superAdmin'), async (req, res, next) => {
  try {
    res.status(201).json(await crearUsuario(req.body));
  } catch (e) {
    next(e);
  }
});

usuariosRouter.delete('/usuarios/:id', requerirAuth, requerirRol('superAdmin'), async (req, res, next) => {
  next(new Error('Pendiente de implementar'));
});

export default usuariosRouter;
