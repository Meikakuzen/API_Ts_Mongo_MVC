import {Request, Response} from 'express'
import {loginUser, registerNewUser} from '../services/auth.services'

export const resgisterController= async ({body}:Request, res: Response)=>{
    
    const responseNewUser = await registerNewUser(body)
    
    res.status(200).send({responseNewUser})
}

export const loginController= async ({body}:Request, res: Response)=>{
    const {email, password}= body
    const responseLogin = await loginUser({email, password})
 
    if(responseLogin==='PASSWORD_INCORRECT'){
        res.status(403).send(responseLogin)
    }else{
        
        res.send(responseLogin)
    }
    
}

