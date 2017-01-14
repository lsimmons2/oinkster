
import express from 'express'
import * as ctrl from './controller'

const router = express.Router();


router.route('/upload')
  .post( (req, res) => {
    return ctrl.upload(req, res);
  })

export default router
