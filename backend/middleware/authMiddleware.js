const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // بيخزن بيانات المستخدم في الـ request
    next();
  } catch (err) {
    return res.status(400).send({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
