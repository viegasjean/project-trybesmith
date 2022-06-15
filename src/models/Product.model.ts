import { Pool, ResultSetHeader } from 'mysql2/promise';
import Product from '../interfaces/Products';

const enum QUERY {
  GETALL = 'SELECT * FROM Trybesmith.Products',
  GET_BY_ID = 'SELECT * FROM Users WHERE id = ?',
  CREATE = 'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
  UPDATE = 'UPDATE Users SET name = ?, email = ?, password = ? WHERE id = ?',
  REMOVE = 'DELETE FROM Users WHERE id = ?',
}

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Product[]> {
    const [products] = await this.connection.execute(QUERY.GETALL);
    return products as Product[];
  }

  public async create(product: Product) {
    const { name, amount } = product;
    const [{ insertId: id }] = await this.connection
      .execute<ResultSetHeader>(QUERY.CREATE, [name, amount]);

    return {
      id,
      ...product,
    };
  }
}