import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import user from '../services/user';

dotenv.config()

const generateToken = (data: object) => {
  return jwt.sign(data, process.env.JWT_SECRET as string, {
      expiresIn: '24h'
  });
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const [authType, token] = req.headers.authorization.split(' ')
    if(authType === 'Bearer') {
      try {
        jwt.verify(token, process.env.JWT_SECRET as string)
        next()
      } catch(err) {}
    } else {
      res.status(403).json({ error: 'Não autorizado' })
    }
  }
}

export default { generateToken, auth }