import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

function validationProduct(req: Request, res: Response, next: NextFunction) {
  const { name, amount } = req.body;

  const SCHEMA = Joi.object({
    name: Joi.string().min(3).required(),
    amount: Joi.string().min(3).required(),
  });

  const { error } = SCHEMA.validate({ name, amount });

  if (error && error.message.includes('required')) {
    return res.status(400).json({ message: error.message });
  }

  if (error) return res.status(422).json({ message: error.message });

  next();
}

export default validationProduct;