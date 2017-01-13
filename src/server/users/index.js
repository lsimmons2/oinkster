
import express from 'express'
import * as ctrl from './controller'
import authenticate from '../auth/authenticate'

const router = express.Router();


router.route('/:id')
  .get((req, res) => {
    return ctrl.getUser(req, res);
  })

router.route('/:id/summary')
  .get((req, res) => {
    return ctrl.getUserSummary(req, res);
  })

export default router
