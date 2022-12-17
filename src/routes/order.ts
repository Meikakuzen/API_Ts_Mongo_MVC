import {Router} from 'express'
import { getItems } from '../controllers/order.controller'
import { checkJwt } from '../middlewares/session'


const router = Router()

router.get('/', checkJwt, getItems)

export {router}