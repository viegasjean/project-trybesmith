import Order from '../interfaces/Orders';
import connection from '../models/connection';
import OrderModel from '../models/Order.model';

export default class OrderService {
  public orderModel: OrderModel;

  constructor() {
    this.orderModel = new OrderModel(connection);
  }

  public async getAll(): Promise<Order[]> {
    const orders = await this.orderModel.getAll();
    return orders;
  }
}