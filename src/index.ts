import express from 'express'

const app = express()

app.use(express.json()) //middleware para usar json como formato de salida

const PORT = 3000

app.get('/ping', (_, res)=>{
    
    res.send('pong')
})


app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${PORT}`)
})