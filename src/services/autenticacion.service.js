import { buscarPorEmail, crearUsuario } from '../models/usuarios.models.js';
import { hashPassword, compararPassword } from '../utils/passwords.js';
import { firmarToken } from '../utils/jwt.js';

export async function registrar({ nombre, email, contrasena, rol = 'usuario' }) {
  const existente = await buscarPorEmail(email);
  if (existente) {
    throw Object.assign(new Error('El email ya está en uso'), { status: 409 });
  }

  const contrasena_hash = await hashPassword(contrasena);
  const usuario = await crearUsuario({ nombre, email, contrasena_hash, rol });
  const token = firmarToken({ id: usuario.id, rol: usuario.rol });

  return { usuario, token };
}

export async function iniciarSesion({ email, contrasena }) {
  const usuario = await buscarPorEmail(email);
  if (!usuario) {
    throw Object.assign(new Error('Credenciales inválidas'), { status: 401 });
  }

  const ok = await compararPassword(contrasena, usuario.contrasena_hash);
  if (!ok) {
    throw Object.assign(new Error('Credenciales inválidas'), { status: 401 });
  }

  const token = firmarToken({ id: usuario.id, rol: usuario.rol });

  return {
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol
    },
    token
  };
}
