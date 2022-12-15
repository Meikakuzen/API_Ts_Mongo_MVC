import { Car } from "../interfaces/car.interface"
import { ItemModel } from "../models/item.model"


export const insertCar = async (item: Car)=>{
    const responseInsert = await ItemModel.create(item)

    return responseInsert
}

export const getCars = async()=>{
    const responseItems = ItemModel.find()
    return responseItems

}

export const getCar= async(id: string)=>{
    const carResponse= await ItemModel.findOne({_id:id})
    return carResponse
}

export const updateCar = async (id: string, data: Car)=>{
    const carResponse= await ItemModel.findOneAndUpdate({_id:id}, data, {new: true})
    return carResponse
}

export const deleteCar = async( id:string)=>{
    const carResponse= await ItemModel.findOneAndDelete({_id:id})
    return carResponse
}