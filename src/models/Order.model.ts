import { Pool /* , ResultSetHeader */ } from 'mysql2/promise';
import Order from '../interfaces/Orders';

const enum QUERY {
  GETALL = `
    SELECT pro.orderId id, ord.userId, JSON_ARRAYAGG(pro.id) productsIds
    FROM Trybesmith.Products pro
    JOIN Trybesmith.Orders ord ON pro.orderId = ord.id
    GROUP BY pro.orderId
    ORDER BY ord.userId, productsIds`,
}

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const [orders] = await this.connection.execute(QUERY.GETALL);
    return orders as Order[];
  }

  // public async create(order: Order) {
  //   const { name, amount } = order;
  //   const [{ insertId: id }] = await this.connection
  //     .execute<ResultSetHeader>(QUERY.CREATE, [name, amount]);

  //   return {
  //     id,
  //     ...order,
  //   };
  // }
}