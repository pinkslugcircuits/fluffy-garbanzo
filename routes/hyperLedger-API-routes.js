import express from 'express'
import { getBlock, getBlocks, assetTransfer } from '../controllers/hyperLedger-API-controller.js'
const route = express.Router()

route.get('/getBlock/:id', getBlock)

route.get('/', getBlocks)

route.put('/:id', assetTransfer)

export { route as hyperLedgerAPIRoute }