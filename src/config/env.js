import 'dotenv/config';

export const env = {
  port: process.env.PORT || 3009,
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3309), // si corrés local contra host
    user: process.env.DB_USER || 'root',
    pass: process.env.DB_PASS || 'root',
    name: process.env.DB_NAME || 'UTNExamen',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'Pa$$word00',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
  bcryptRounds: Number(process.env.BCRYPT_ROUNDS || 10),
};
