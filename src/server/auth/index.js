
import express from 'express'
import { authenticate, logIn} from './controller'

const router = express.Router();


router.route('/login')
  .post((req, res, next) => {
    return logIn(req, res, next);
  })

router.route('/verify')
  .get(authenticate, (req, res, next) => {
    return res.status(200).json({
      message: 'Verified token',
      userId: req.user.id
    })
  })


export default router
