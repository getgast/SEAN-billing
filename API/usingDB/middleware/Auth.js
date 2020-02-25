import jwt from 'jsonwebtoken';
import db from '../db';

const Auth = {
  /**
   * Verify Token
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @returns {object|void} response object 
   */
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    console.log(token)
    if(!token) {
      return res.status(400).send({ 'message': 'Token is not provided' });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      console.log(decoded)
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(text, [decoded.userId]);
      console.log(rows)
      if(!rows[0]) {
        return res.status(400).send({ 'message': 'The token you provided is invalid' });
      }
      req.user = { id: decoded.userId };
      next();
    } catch(error) {
        console.log('blad')
      return res.status(400).send(error);
    }
  }
}

export default Auth;