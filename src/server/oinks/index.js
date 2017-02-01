
import express from 'express'
import * as ctrl from './controller'
import { authenticate, loggedIn } from '../auth/controller'

const router = express.Router();


router.route('/')
  .get( loggedIn, (req, res) => {
    return ctrl.getOinks(req, res);
  })
  .post( authenticate, (req, res) => {
    return ctrl.insertOink(req, res);
  })

export default router
