import { Response} from 'express'
import { RequestExt } from '../middlewares/session'
import { handleHttp } from '../utils/errorHandle'

export const getItems= async(req: RequestExt, res: Response)=>{
    try {
     res.send({
        msg: 'ESTO SOLO LO VEN LAS PERSONAS AUTENTICADAS',
        user: req?.user
     })
  
        
    } catch (error) {
        handleHttp(res, 'ERROR_GET_ITEMS')
    }
}