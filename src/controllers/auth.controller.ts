import {Request, Response} from 'express'
import {registerNewUser} from '../services/auth.services'

export const resgisterController= async ({body}:Request, res: Response)=>{
    
    const responseNewUser = await registerNewUser(body)
    
    res.status(200).send({responseNewUser})
}

export const loginController=(req:Request, res: Response)=>{

}

