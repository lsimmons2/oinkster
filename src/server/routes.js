
import express from 'express'
import oinks from './oinks'


let router = express.Router();

router.use('/oinks', oinks);


export default router
