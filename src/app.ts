import express from 'express';
import ProductController from './controllers/Product.controller';
import validationProduct from './middlewares/products.middleware';

const app = express();

const productController = new ProductController();

app.use(express.json());

app.get('/products', productController.getAll);

app.post('/products', validationProduct, productController.create);

export default app;
