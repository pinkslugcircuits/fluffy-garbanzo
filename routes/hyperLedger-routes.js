import express from 'express'
import { addUser, getBlocks, getBlock, changeOwner, processChangeOwner} from '../controllers/hyperLedger-controller.js'
const route = express.Router()

route.get('/getBlock/:id', getBlock)
route.get('/changeOwner/:id', changeOwner)
route.post('/changeOwner/:id', processChangeOwner)
route.get('/', addUser)


export { route as hyperLedger }