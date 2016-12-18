
import express from 'express'
import * as ctrl from './controller'

const router = express.Router();


router.route('/')
  .get((req, res) => {
    return ctrl.getOinks(req, res);
  })
  .post((req, res) => {
    return ctrl.insertOink(req, res);
  })

export default router
