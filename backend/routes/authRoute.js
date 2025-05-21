import express from 'express'
import { addJokes, getAllJokes, getCategoryJokes, login, register } from '../controller/authController.js'
import { verifyToken } from '../middleware/auth.js'



const route = express.Router()

route.post('/register',register)
route.post('/login',login)
route.post('/addjokes',addJokes)
route.get('/getAllJokes',getAllJokes)
route.get('/categoryBased',getCategoryJokes)

export default route