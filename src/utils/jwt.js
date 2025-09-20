import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const firmarToken = (payload) =>
  jwt.sign(payload, env.jwt.secret, { expiresIn: env.jwt.expiresIn });

export const verificarToken = (token) =>
  jwt.verify(token, env.jwt.secret);
