
import express from 'express'
import * as ctrl from './controller'
import { authenticate } from '../auth/controller'

const router = express.Router();


router.route('/')
  .post( authenticate, (req, res) => {
    return ctrl.createRelationship(req, res);
  })

export default router
