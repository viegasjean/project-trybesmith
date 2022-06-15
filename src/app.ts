import express from 'express';
import ProductController from './controllers/Product.controller';
import UserController from './controllers/User.controller';
import validationProduct from './middlewares/products.middleware';
import validationUser from './middlewares/users.middleware';

const app = express();

const productController = new ProductController();
const userController = new UserController();

app.use(express.json());

app.get('/products', productController.getAll);

app.post('/products', validationProduct, productController.create);

app.post('/users', validationUser, userController.create);

export default app;
