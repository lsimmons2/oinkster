
import express from 'express'
import * as ctrl from './controller'
import { authenticate } from '../auth/controller'
const router = express.Router();


router.route('/upload/:id')
  .post(authenticate, (req, res) => {
    return ctrl.upload(req, res);
  })

export default router
