import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'suaSenhaSecreta';

interface TokenPayload {
  data: { id: string };
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization: token } = req.headers;
  if (!token) return res.sendStatus(401);

  try {
    const { data: { id } } = jwt.verify(token, JWT_SECRET) as TokenPayload;

    req.body.userId = id;

    next();
  } catch {
    return res.sendStatus(401);
  }
}