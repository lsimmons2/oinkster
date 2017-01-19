
import express from 'express'
import * as ctrl from './controller'
import authenticate from './authenticate'

const router = express.Router();


router.route('/login')
  .post((req, res, next) => {
    return ctrl.logIn(req, res, next);
  })

router.route('/verify')
  .get(authenticate, (req, res, next) => {
    return res.status(200).json({
      message: 'Verified token',
      userId: req.user.id
    })
  })


export default router
