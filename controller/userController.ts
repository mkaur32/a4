import { Request, Response } from 'express';
import User from "../model/user"
import jwt from 'jsonwebtoken';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, userPassword } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = new User({ username, userPassword });
    await newUser.save();

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};



export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, userPassword } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const isPasswordValid = await user.comparePassword(userPassword);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Create a JWT token with the user's identity (username)
    const token = jwt.sign({ user: user.username }, 'your-secret-key', {
      expiresIn: '1h', // Token expiration time
    });
    // console.log(token)
    console.log("I got hereee");

    return res.status(200).json({ message: 'Authentication successful', token });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

