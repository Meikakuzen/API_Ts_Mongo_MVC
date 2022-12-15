import { Request, Response } from "express"
import { deleteCar, getCar, getCars, insertCar, updateCar } from "../services/item.service"
import { handleHttp } from "../utils/errorHandle"

export const getItem= async ({params}: Request, res: Response)=>{
    try {
        const {id} = params
        const response = await getCar(id)
        const data = response ? response: 'NOT_FOUND'
        res.status(200).send(data)
        
    
    } catch (error) {
        handleHttp(res, 'ERROR_GET_ITEM')
    }
}

export const getItems= async(_: Request, res: Response)=>{
    try {
        const response= await getCars()
        res.status(200).send(response)
  
        
    } catch (error) {
        handleHttp(res, 'ERROR_GET_ITEMS')
    }
}

export const postItem= async ({body}: Request, res: Response)=>{
    try {
     const responseItem = await insertCar(body)
     res.status(200).send(responseItem)
        
    } catch (error) {
        handleHttp(res, 'ERROR_POST_ITEM')
    }
}

export const updateItem= async ({params, body}: Request, res: Response)=>{
    try {
        const {id} = params

       const updatedCar = await updateCar(id, body)

        res.send(updatedCar)
        
    } catch (error) {
        handleHttp(res, 'ERROR_UPDATE_ITEM')
    }
}

export const deleteItem=async ({params}: Request, res: Response)=>{
    try {
        const {id}= params

        await deleteCar(id)
        res.send("Car deleted")
        
    } catch (error) {
        handleHttp(res, 'ERROR_DELETE_ITEM')
    }
}


