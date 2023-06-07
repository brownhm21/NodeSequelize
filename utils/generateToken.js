const jwt = require('jsonwebtoken');

// Generate a JWT token
function generateToken(userId) {
  const token = jwt.sign({ userId }, 'your-secret-key', { expiresIn: '1h' });
  return token;
}

// Verify a JWT token
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

module.exports = { generateToken, verifyToken };