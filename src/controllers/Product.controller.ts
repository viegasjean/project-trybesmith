import { Request, Response } from 'express';
import ProductService from '../services/Product.service';

export default class ProductController {
  public productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  public getAll = async (_req: Request, res: Response) => {
    const products = await this.productService.getAll();
    res.status(200).json(products);
  };
}