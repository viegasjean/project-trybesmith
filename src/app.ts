import express from 'express';
import ProductController from './controllers/Product.controller';

const app = express();

const productController = new ProductController();

app.use(express.json());

app.get('/products', productController.getAll);

export default app;
