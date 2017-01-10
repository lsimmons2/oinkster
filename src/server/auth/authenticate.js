
import jwt from 'jsonwebtoken'


export default function authenticate(req, res, next){
  let token = req.headers['authorization'].replace('Bearer ', '');
  jwt.verify(token, 'sah', (err, user) => {
    if (err){
      return res.status(403).json({
        message: 'cant get through me',
        err
      })
    }
    req.user = user;
    next();
  })
}
