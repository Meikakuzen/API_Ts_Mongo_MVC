import { Request, Response } from "express"
import { insertItem } from "../services/item.service"
import { handleHttp } from "../utils/errorHandle"

export const getItem=(_: Request, res: Response)=>{
    try {
        
    } catch (error) {
        handleHttp(res, 'ERROR_GET_ITEM')
    }
}

export const getItems=(_: Request, res: Response)=>{
    try {
        
    } catch (error) {
        handleHttp(res, 'ERROR_GET_ITEMS')
    }
}

export const postItem= async ({body}: Request, res: Response)=>{
    try {
     const responseItem = await insertItem(body)
     res.status(200).send(responseItem)
        
    } catch (error) {
        handleHttp(res, 'ERROR_POST_ITEM')
    }
}

export const updateItem=(_: Request, res: Response)=>{
    try {
        
    } catch (error) {
        handleHttp(res, 'ERROR_UPDATE_ITEM')
    }
}

export const deleteItem=(_: Request, res: Response)=>{
    try {
        
    } catch (error) {
        handleHttp(res, 'ERROR_DELETE_ITEM')
    }
}


