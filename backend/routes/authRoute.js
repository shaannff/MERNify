import express from 'express'
import { register } from '../controller/authController.js'

const route = express.Router()

route.post('/users',register)

export default route