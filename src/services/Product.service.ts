import Product from '../interfaces/Products';
import connection from '../models/connection';
import ProductModel from '../models/Product.model';

export default class ProductService {
  public productModel: ProductModel;

  constructor() {
    this.productModel = new ProductModel(connection);
  }

  public async getAll(): Promise<Product[]> {
    const products = await this.productModel.getAll();
    return products;
  }

  public create(product: Product): Promise<Product> {
    return this.productModel.create(product);
  }
}