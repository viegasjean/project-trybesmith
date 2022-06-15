import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

function validationUser(req: Request, res: Response, next: NextFunction) {
  const { username, classe, level, password } = req.body;

  const SCHEMA = Joi.object({
    username: Joi.string().min(3).required(),
    classe: Joi.string().min(3).required(),
    level: Joi.number().min(1).required(),
    password: Joi.string().min(8).required(),
  });

  const { error } = SCHEMA.validate({ username, classe, level, password });

  if (error && error.message.includes('required')) {
    return res.status(400).json({ message: error.message });
  }

  if (error) return res.status(422).json({ message: error.message });

  next();
}

export default validationUser;