📦 Backend con Node.js, Express y Docker

🚀 Tecnologías

Node.js + Express

MySQL (puerto 3309)

JWT y bcrypt

Docker & Docker Compose


/config        -> configuración de conexión a la base de datos

/controllers   -> lógica de negocio

/interfaces    -> definición de tipos y contratos

/middlewares   -> guards, autenticación y validación de roles

/models        -> definición de clases y entidades

/routes        -> definición de endpoints REST

/services      -> conexión entre controllers y repositorios

/sql           -> script de inicialización de la base de datos

🐳 Levantar el proyecto con Docker

Construir y levantar los contenedores:

docker-compose up --build

Esto iniciará:

Un contenedor con MySQL (puerto 3309)

Un contenedor con la API Node.js (puerto 3009)

Ver logs:

docker-compose logs -f

Para apagar:

docker-compose down

📡 Endpoints principales
Autenticación

POST /auth/register → Registro de usuario (con contraseña hasheada).

POST /auth/login → Login con JWT.

Usuarios

GET /usuarios → Lista de usuarios con cantidad de pedidos (solo superAdmin).

DELETE /usuarios/:id → Eliminar usuario (solo superAdmin).

Productos

POST /productos → Crear producto (admin o superAdmin).

GET /productos → Listar productos.

PUT /productos/:id → Actualizar producto.

DELETE /productos/:id → Eliminar producto.

Pedidos

POST /pedidos → Crear pedido (user).

GET /pedidos → Listar pedidos con detalle y totales.

🔑 Roles y permisos

superAdmin → puede crear/eliminar usuarios, gestionar productos y pedidos.

admin → puede gestionar productos y ver pedidos.

user → puede crear pedidos y ver sus propios pedidos.

<img width="270" height="276" alt="image" src="https://github.com/user-attachments/assets/4b7ba7f9-501d-4e35-b551-e01d271b443f" />

