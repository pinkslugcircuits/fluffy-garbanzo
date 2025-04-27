import express from 'express'
import { profile } from '../controllers/profile-controller.js'
import passport from 'passport'
const profRoutes = express.Router()
import { authCheck } from '../middleware/security.js'


//auth login
profRoutes.get('/', authCheck, profile)

export {
    profRoutes
}