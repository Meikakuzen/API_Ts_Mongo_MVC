import { User } from "../interfaces/user.interface"
import { UserModel } from "../models/user.model"

export const registerNewUser = async ({name, email, password}: User)=>{
    const existUser =  await UserModel.findOne({email})  
    if(existUser) return 'ALREADY_USER'

    const registerNewUser = await UserModel.create({name, email, password})

    return registerNewUser
}

