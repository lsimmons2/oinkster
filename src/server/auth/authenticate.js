
import jwt from 'jsonwebtoken'


export default function authenticate(req, res, next){
  if (req.headers['authorization'] === undefined){
    return res.status(400).json({
      message: 'nah'
    });
  }
  let token = req.headers['authorization'].replace('Bearer ', '');
  jwt.verify(token, 'sah', (err, user) => {
    if (err){
      return res.status(403).json({
        message: 'Invalid JWT',
        err
      });
    }
    req.user = user;
    next();
  })
}
