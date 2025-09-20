import * as auth from '../services/autenticacion.service.js';

export const registrarUsuario = async (req, res, next) => {
  try {
    const data = await auth.registrar(req.body);
    res.status(201).json(data);
  } catch (e) {
    next(e);
  }
};

export const iniciarSesionUsuario = async (req, res, next) => {
  try {
    const data = await auth.iniciarSesion(req.body);
    res.json(data);
  } catch (e) {
    next(e);
  }
};
