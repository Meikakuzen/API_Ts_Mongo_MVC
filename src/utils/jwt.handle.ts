import {sign} from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key'

export const generateToken =  (id: string)=>{
    const jwt = sign({id}, JWT_SECRET, {
        expiresIn: "2h"
    })
    return jwt
}

export const verifyToken =()=>{

}