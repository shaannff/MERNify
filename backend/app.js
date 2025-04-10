import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoute from '../backend/routes/authRoute.js'


dotenv.config()
const app = express()

const port =7000||5000

mongoose.connect(process.env.MONGOURL).then(()=>{
    console.log('db connected ')
}).catch((err)=>{
    console.log(err,'from the db')
})
app.use(cors())
app.use(express.json())

app.use('/api/auth',authRoute)

app.listen(port,()=>console.log(`server running on the http://localhost:${port}`))