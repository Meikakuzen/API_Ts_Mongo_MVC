import {Router, Response} from 'express'

const router = Router()

router.get('/', (_ ,res: Response)=>{
    res.send({data: "AQUI VAN LOS MODELOS"})
})

export {router}