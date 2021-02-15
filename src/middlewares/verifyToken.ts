import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IRequest extends Request {
  isAuth?: boolean;
  _id?: string;
}

const verifyToken = (req: IRequest, _res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }

  let decodedToken: any;
  try {
    decodedToken = jwt.verify(token, process.env.TOKEN_SECRET ?? '');
  } catch (err) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req._id = decodedToken?._id;
  next();
};

export default verifyToken;
