
import express from 'express'

import auth from './auth'
import oinks from './oinks'


let router = express.Router();

route.use('/auth', auth);

router.use('/oinks', oinks);


export default router
