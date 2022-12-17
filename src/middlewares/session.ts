import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../utils/jwt.handle";

export interface RequestExt extends Request{
    user?: string | JwtPayload
}


export const checkJwt = (req: RequestExt, res: Response, next: NextFunction)=>{
    try {
        const jwtByUser= req.headers.authorization || null
        
        const jwt = jwtByUser?.split(' ').pop()

        const isUser = verifyToken(`${jwt}`)

        if(!isUser){
            res.status(401).send({
                msg: 'INVALID_TOKEN'
            })
        }else{
            req.user = isUser
            next()
        }

        
        
    } catch (error) {
        res.status(400).send({
            msg: "SESIÓN_NO_VÁLIDA"
        })
    }
}