// authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

export interface CustomJwtPayload extends JwtPayload {
  user: string; // Change this type to match the actual type of your user identifier
}

 const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  // Check for a JWT token in the request header or cookies, depending on your implementation
  const token = req.header('x-auth-token'); // Change this to match your header name

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key') as CustomJwtPayload;
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
export default isAuthenticated;
