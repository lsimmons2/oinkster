
import express from 'express'
import * as ctrl from './controller'
import authenticate from '../auth/authenticate'

const router = express.Router();


router.route('/:id/settings')
  .get((req, res) => {
    return ctrl.getUserSettings(req, res);
  })
  .post((req, res) => {
    return ctrl.updateUserSettings(req, res);
  })

router.route('/:id/summary')
  .get((req, res) => {
    return ctrl.getUserSummary(req, res);
  })

export default router
