import { Request, Response } from 'express';
import OrderService from '../services/Order.service';

export default class OrderController {
  public orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.orderService.getAll();
    res.status(200).json(orders);
  };

  // public create = async (req: Request, res: Response) => {
  //   const order = req.body;

  //   const orderCreated = await this.orderService.create(order);
  //   res.status(201).json(orderCreated);
  // };
}