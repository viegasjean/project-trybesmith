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

  public getUser = async (req: Request, res: Response) => {
    const user = req.body;

    if (!user.username) return res.status(400).json({ message: '"username" is required' });
    if (!user.password) return res.status(400).json({ message: '"password" is required' });

    const users = await this.userService.getUser(user);

    if (!users.length) return res.status(401).json({ message: 'Username or password invalid' });

    const token = jwt.sign({ data: user }, JWT_SECRET, { expiresIn: '7d', algorithm: 'HS256' });
    res.status(200).json({ token });
  };

  public create = async (req: Request, res: Response) => {
    const user = req.body;

    await this.userService.create(user);

    const token = jwt.sign({ data: user }, JWT_SECRET, { expiresIn: '7d', algorithm: 'HS256' });
    res.status(201).json({ token });
  };
}