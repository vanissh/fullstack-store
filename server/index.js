import 'dotenv/config'
import express from 'express'
import sequelize from './db.js'
import models from './models/models.js'
import cors from 'cors'
import router from './routes/index.js'
import errorHandler from './middleware/ErrorHandlingWiddleware.js'
import fileUpload from 'express-fileupload'
import path from 'path'

const __dirname = path.resolve()

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router) 

//Обработка ошибок, последний middleware
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server has been started on ${PORT} port...`))
    } catch(e) {
        console.log(e)
    }
}

start()
