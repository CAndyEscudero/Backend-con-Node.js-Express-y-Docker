import { Router } from 'express';
import { registrarUsuario, iniciarSesionUsuario } from '../controllers/autenticacion.controller.js';
import { requerirAutenticacion } from '../middlewares/auth.js';
const autenticacionRouter = Router();

autenticacionRouter.post('/register', registrarUsuario);
autenticacionRouter.post('/login', iniciarSesionUsuario);
autenticacionRouter.get('/profile', requerirAutenticacion);

export default autenticacionRouter;
