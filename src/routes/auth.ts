import {Router} from 'express'
import {resgisterController, loginController} from '../controllers/auth.controller'


const router = Router()

router.post('/register', resgisterController)
router.post('/login', loginController)


export {router}