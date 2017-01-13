
import express from 'express'

import auth from './auth'
import oinks from './oinks'
import users from './users'


let router = express.Router();

router.use('/auth', auth);

router.use('/oinks', oinks);

router.use('/users', users);


export default router
