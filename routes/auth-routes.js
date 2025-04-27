import express from 'express'
import { login, logoutControl, logInGithub } from '../controllers/auth-controller.js'
import passport from 'passport'
const authRoutes = express.Router()

//auth login
authRoutes.get('/login', login)

//auth logout
authRoutes.get('/logout', logoutControl)

//auth google
authRoutes.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))

authRoutes.get('/google/redirect', passport.authenticate('google'), (req, res) =>  {
    res.redirect('/profile')
})

//auth github
authRoutes.get('/github', logInGithub)

export {
    authRoutes
}