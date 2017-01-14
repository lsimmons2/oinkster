
import express from 'express'

import auth from './auth'
import oinks from './oinks'
import users from './users'
import aws from './aws'


let router = express.Router();

router.use('/auth', auth);

router.use('/oinks', oinks);

router.use('/users', users);

router.use('/aws', aws);


export default router
