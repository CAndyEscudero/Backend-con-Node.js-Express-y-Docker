import express from 'express';
import morgan from 'morgan';
import autenticacionRouter from './routes/autenticacion.routes.js';
import usuariosRouter from './routes/usuarios.routes.js';
import productosRouter from './routes/productos.routes.js';
import pedidosRouter from './routes/pedidos.routes.js';
import reportesRouter from './routes/reportes.routes.js';
import { manejoDeErrores } from './middlewares/error.js';
import { env } from './config/env.js';

const app = express();
app.use(express.json());
app.use(morgan('dev'));


app.use('/api/auth', autenticacionRouter);
app.use('/api', usuariosRouter);
app.use('/api', productosRouter);
app.use('/api', pedidosRouter);
app.use('/api', reportesRouter);

app.use(manejoDeErrores);

app.listen(env.port, () => console.log(`🚀 API escuchando en el puerto: ${env.port}`));
