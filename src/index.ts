import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import {router} from './routes/index'
import dbConnect from './config/mongo'

const app = express()
const PORT = process.env.PORT || 3000
dbConnect().then(()=> console.log("DB corriendo"))

app.use(cors())
app.use(express.json())

app.use(router)

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en ${PORT}`)
})