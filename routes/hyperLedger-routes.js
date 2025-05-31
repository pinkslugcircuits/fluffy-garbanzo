import express from 'express'
import { addUser, getBlocks, getBlock } from '../controllers/hyperLedger-controller.js'
const route = express.Router()

route.get('/getBlock/:id', getBlock)
route.get('/', addUser)


export { route as hyperLedger }