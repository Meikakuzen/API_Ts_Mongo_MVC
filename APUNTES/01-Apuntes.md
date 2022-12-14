# API REST MONGODB TYPESCRIPT

> npm i cors dotenv mongoose multer

> npm i @types/cors @types/dotenv @types/express @types/mongoose @types/multer -D

- Copio aquí mi package.json

~~~json
{
  "name": "apiresttypescript",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "ts-node-dev src/index.ts",
    "tsc": "tsc",
    "start": "node build/index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/cors": "^2.8.13",
    "@types/dotenv": "^8.2.0",
    "@types/express": "^4.17.15",
    "@types/mongoose": "^5.11.97",
    "@types/multer": "^1.4.7",
    "ts-node-dev": "^2.0.0",
    "typescript": "^4.9.4"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "4.18.2",
    "mongoose": "^6.8.0",
    "multer": "^1.4.5-lts.1"
  }
}

~~~

- Creo el archivo index.ts (puede ser que lo llame app.ts más adelante, son lo mismo) en src y configuro el server

~~~ts
import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())


app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en ${PORT}`)
})
~~~

- Creo el archivo en raíz .env
- Añado la variable PORT

> PORT= 3000

- Creo el archivo item.ts en routes
- Creo el router. Lo exporto como un objeto para poder hacer luego la importación dinámica
- item.ts

~~~js
import {Router, Response} from 'express'

const router = Router()

router.get('/items', (_ ,res: Response)=>{
    res.send({data: "AQUI VAN LOS MODELOS"})
})

export {router}
~~~

- Debo usar el router en app.ts

~~~js
app.use(ItemsRouter)
~~~

- Creo el archivo index.ts en routes
- Importo el router y la función readdirSync de fs
- __dirname es una constante que viene integrada en node, devuelve la ruta del directorio actual del archivo
- readdirSync es una función que se encarga de leer cuántos y cuales son los archivos que existen en 'x' directorio
- Esta me va a devolver un array y un filename

~~~js
import {Router} from 'express'
import {readdirSync} from 'fs'



const PATH_ROUTER = `${__dirname}`

const router = Router()

readdirSync(PATH_ROUTER).filter((fileName)=>{
    console.log(fileName)
})


export {router}
~~~

- Si ahora incorporo el router en index.ts me imprime en consola item.routes.ts
- Voy a crear una función en index (routes) para limpiar el fileName
    - En el router.get('item') está sin .ts
    - Lo que quiero es que el nombre del archivo sea el nombre del prefijo de la ruta
    - Quiero quitarle el .ts al fileName
        - Para ello usaré split. este devuelve un array. 'item'.'ts'
        - Con shift retiro el primer elemento del array y lo retorno

~~~js
const cleanFileName= (fileName: string)=>{
    const file= fileName.split('.').shift()
    return file
}
~~~

- El index no es una ruta que yo quiera tener. Le puedo poner un condicional

~~~js
readdirSync(PATH_ROUTER).filter((fileName)=>{
    const cleanName= cleanFileName(fileName)
    if(cleanName !== 'index'){
        
    }
})
~~~

- Una vez aqui tengo que hacer uso del router, para que tenga acceso al nombre de la ruta de forma dinámica

~~~ts
readdirSync(PATH_ROUTER).filter((fileName)=>{
    const cleanName= cleanFileName(fileName)
    if(cleanName != 'index'){
        router.use(`./${cleanName}`)
    }
})
~~~

- Para que esto se implemente se necesita hacer una importación dinámica
- Voy a item.routes y borro del get('/item') para dejarlo en get('/')
- La importación dinámica devuelve una promesa
- moduleRouter es el router que está dentro de la ruta, lo capturo en la promesa
- Uso el router del index.ts(routes) con el nombre del archivo limpio como ruta, y con el router con notación con punto capturado de la promesa ya que lo exporté como un objeto

- index.ts (routes)
~~~ts
import {Router} from 'express'
import {readdirSync} from 'fs'



const PATH_ROUTER = `${__dirname}`

const router = Router()

const cleanFileName= (fileName: string)=>{
    const file= fileName.split('.').shift()
    return file
}

readdirSync(PATH_ROUTER).filter((fileName)=>{
    const cleanName= cleanFileName(fileName)
    if(cleanName !== 'index'){
        import(`./${cleanName}`)
            .then((moduleRouter)=>{
                console.log(`Se está cargando la ruta ... ${cleanName}`)
                router.use(`/${cleanName}`, moduleRouter.router)
            })
    
    }
})


export {router}
~~~

- Para usar el cargador de rutas dinámico cambio la importación del router de item a index
- index.ts (src)

~~~ts
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import {router} from './routes/index' //cambio

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use(router)

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en ${PORT}`)
})
~~~

- item.ts. (Se cambió la ruta del GET de '/items' a '/')

~~~ts
import {Router, Response} from 'express'

const router = Router()

router.get('/', (_ ,res: Response)=>{
    res.send({data: "AQUI VAN LOS MODELOS"})
})

export {router}
~~~

- En todos los archivos de rutas que escriba debo exportar el router como un objeto
- el nombre del archivo es el nombre de la ruta
- min 30:32