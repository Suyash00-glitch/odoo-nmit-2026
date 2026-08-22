import { verifyAccessToken } from '../utils/jwt.js';
import { AppError } from '../utils/appError.js';

export const authMiddleware = (req, _res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError('Authentication token missing', 401, 'UNAUTHORIZED');
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = verifyAccessToken(token);
    req.user = { id: payload.id, role: payload.role };
    next();
  } catch {
    throw new AppError('Invalid or expired token', 401, 'UNAUTHORIZED');
  }
};
