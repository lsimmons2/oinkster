
import express from 'express'
import * as ctrl from './controller'
import { authenticate } from '../auth/controller'

const router = express.Router();


router.route('/')
  .get((req, res) => {
    return ctrl.getOinks(req, res);
  })
  .post( authenticate, (req, res) => {
    return ctrl.insertOink(req, res);
  })

export default router
