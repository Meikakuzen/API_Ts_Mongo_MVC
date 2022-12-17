import {Request, Response} from 'express'
import { handleHttp } from '../utils/errorHandle'

export const getItems= async(_: Request, res: Response)=>{
    try {
     res.send('ESTO SOLO LO VEN LAS PERSONAS AUTENTICADAS')
  
        
    } catch (error) {
        handleHttp(res, 'ERROR_GET_ITEMS')
    }
}