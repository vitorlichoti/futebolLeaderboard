import { sign } from 'jsonwebtoken';
import User from '../database/models/User';

const secret = process.env.JWT_SECRET || 'meusecret';

const tokenGenerator = (user: User) => {
  const payload = { id: user.id, role: user.role };

  const token = sign(payload, secret);

  return token;
};

export default tokenGenerator;
