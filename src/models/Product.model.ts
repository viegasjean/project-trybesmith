import { Pool } from 'mysql2/promise';
import Product from '../interfaces/Products';

const enum QUERY {
  GETALL = 'SELECT * FROM Trybesmith.Products',
  GET_BY_ID = 'SELECT * FROM Users WHERE id = ?',
  GET_BY_EMAIL = 'SELECT * FROM Users WHERE email = ?',
  CREATE = 'INSERT INTO Users (name, email, password) VALUES (?, ?, ?)',
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
}