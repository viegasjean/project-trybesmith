import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserService from '../services/User.service';

const JWT_SECRET = 'suaSenhaSecreta';

export default class UserController {
  public userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public getAll = async (_req: Request, res: Response) => {
    const users = await this.userService.getAll();
    res.status(200).json(users);
  };

  public create = async (req: Request, res: Response) => {
    const user = req.body;

    await this.userService.create(user);

    const token = jwt.sign({ data: user }, JWT_SECRET, { expiresIn: '7d', algorithm: 'HS256' });
    res.status(201).json({ token });
  };
}