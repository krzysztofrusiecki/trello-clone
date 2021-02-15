import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User, { IUser } from '../models/User';

interface IRequest extends Request {
  isAuth?: boolean;
  _id?: string;
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw Error('There is no user with this email in our system');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw Error('Wrong email or password');
    }

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET ?? '', {
      expiresIn: '1h',
    });
    if (!token) throw Error('Could not sign the token');

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error.message,
    });
  }
};

export const register = async (req: Request, res: Response) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const userInDB = await User.findOne({ email });
    if (userInDB) {
      throw Error('User with this email already exists');
    }

    const user: IUser = new User({
      email,
      password,
      firstname,
      lastname,
    });
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = await user.save();

    const token = jwt.sign(
      { _id: newUser._id },
      process.env.TOKEN_SECRET ?? '',
      {
        expiresIn: '1h',
      },
    );
    return res.status(200).json({
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error.message,
    });
  }
};

export const getUser = async (req: IRequest, res: Response) => {
  if (!req._id) return res.status(400).json({ error: 'No user was logged in' });

  try {
    const user = await User.findOne({ _id: req._id });
    if (!user) throw Error('User does not exist');

    return res.status(200).json({
      id: user._id,
      email: user.email,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
