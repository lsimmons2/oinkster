
import express from 'express'
import * as ctrl from './controller'

const router = express.Router();


router.route('/signup')
  .post((req, res, next) => {
    return ctrl.signUp(req, res, next);
  })

router.route('/login')
  .post((req, res, next) => {
    return ctrl.logIn(req, res, next);
  })


export default router
