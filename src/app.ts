import express from 'express';
import OrderController from './controllers/Order.controller';
import ProductController from './controllers/Product.controller';
import UserController from './controllers/User.controller';
// import authMiddleware from './middlewares/auth.middleare';
import validationProduct from './middlewares/products.middleware';
import validationUser from './middlewares/users.middleware';

const app = express();

const productController = new ProductController();
const userController = new UserController();
const orderController = new OrderController();

app.use(express.json());

app.get('/products', productController.getAll);

app.post('/products', validationProduct, productController.create);

app.post('/users', validationUser, userController.create);

app.get('/orders', orderController.getAll);

export default app;
