import { Router } from 'express';
import { requerirAutenticacion} from '../middlewares/auth.js';
import { requerirRol } from '../middlewares/roles.js';
import { listaUsuarioConRecuentoDePedidos, crearUsuario } from '../models/usuarios.models.js';

const usuariosRouter = Router();

usuariosRouter.get('/usuarios', requerirAutenticacion,requerirRol('superAdmin'), async (req, res, next) => {
  try {
    res.json(await listaUsuarioConRecuentoDePedidos());
  } catch (e) {
    next(e);
  }
});

usuariosRouter.post('/usuarios', requerirAutenticacion, requerirRol('superAdmin'), async (req, res, next) => {
  try {
    res.status(201).json(await crearUsuario(req.body));
  } catch (e) {
    next(e);
  }
});

usuariosRouter.delete('/usuarios/:id', requerirAutenticacion, requerirRol('superAdmin'), async (req, res, next) => {
  next(new Error('Pendiente de implementar'));
});

export default usuariosRouter;
