
import express from 'express'
import * as ctrl from './controller'
import { authenticate } from '../auth/controller'

const router = express.Router();


router.route('/')
  .post((req, res) => {
    return ctrl.createUser(req, res);
  })

router.route('/:id/settings')
  .get(authenticate, (req, res) => {
    return ctrl.getUserSettings(req, res);
  })
  .put(authenticate, (req, res) => {
    return ctrl.updateUserSettings(req, res);
  })

router.route('/:id/summary')
  .get((req, res) => {
    return ctrl.getUserSummary(req, res);
  })

router.route('/:id/board')
  .get((req, res) => {
    return ctrl.getUserBoardProfile(req, res);
  })

export default router
