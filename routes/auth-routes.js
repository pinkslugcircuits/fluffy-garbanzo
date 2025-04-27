import express from 'express'
import { login, logout, logInGoogle, logInGithub } from '../controllers/auth-controller.js'
const authRoutes = express.Router()

//auth login
authRoutes.get('/login', login)

//auth logout
authRoutes.get('/logout', logout)

//auth google
authRoutes.get('/google', logInGoogle)

//auth github
authRoutes.get('/github', logInGithub)

export {
    authRoutes
}