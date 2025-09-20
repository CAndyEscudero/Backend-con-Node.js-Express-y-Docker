import bcrypt from 'bcrypt';
import { env } from '../config/env.js';

export const hashPassword = (plain) => bcrypt.hash(plain, env.bcryptRounds);
export const compararPassword = (plain, hash) => bcrypt.compare(plain, hash);
