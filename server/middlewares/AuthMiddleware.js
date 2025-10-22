import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: 'You are not authenticated!' });
    }

    jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
      if (err) return res.status(403).json({ message: 'Token is not valid!' });
      req.userId = payload.userId;
      next();
    });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error.' });
  }
}