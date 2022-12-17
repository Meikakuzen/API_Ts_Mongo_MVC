import { NextFunction, Request, Response } from "express";



export const checkJwt = (req: Request, res: Response, next: NextFunction)=>{
    try {
        const jwtByUser= req.headers.authorization || null
        console.log(jwtByUser)
        next()
        
    } catch (error) {
        res.status(400).send({
            msg: "SESIÓN_NO_VÁLIDA"
        })
    }
}