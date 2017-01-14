
import express from 'express'
import * as ctrl from './controller'

const router = express.Router();


router.route('/upload/:id')
  .post( (req, res) => {
    return ctrl.upload(req, res);
  })

export default router
