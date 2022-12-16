import { Auth } from "../interfaces/auth.interface"
import { User } from "../interfaces/user.interface"
import { UserModel } from "../models/user.model"
import { encrypt, verified } from "../utils/bcrypt.handle"

export const registerNewUser = async ({name, email, password}: User)=>{
    const existUser =  await UserModel.findOne({email})  
    if(existUser) return 'ALREADY_USER'

    const passwordHash = await encrypt(password)

    const registerNewUser = await UserModel.create({name, email, password: passwordHash})

    return registerNewUser
}

export const loginUser = async ({email, password}:Auth)=>{
    const existUser =  await UserModel.findOne({email})  
    if(!existUser) return 'NOT_FOUND_USER'

    const passwordHash = existUser.password
    const isCorrect = await verified(password, passwordHash)
    if(!isCorrect) return "PASSWORD_INCORRECT"

    return existUser
}

