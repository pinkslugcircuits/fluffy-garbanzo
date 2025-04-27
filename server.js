//imports
import express from 'express'
import { authRoutes } from './routes/auth-routes.js'
import { profRoutes } from './routes/profile-routes.js'
import passport from 'passport'
import { GoogleStrategy } from './services/passport-setup.js'
import expressSession from 'express-session'
import 'dotenv/config'

//server setup
const app = express()
app.use(express.static('views'))
app.set('view engine', 'ejs')

app.use(expressSession({
    secret: [process.env.COOKIE_KEY],
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }    
}))

app.use(passport.initialize())
app.use(passport.session())

//routes
app.use('/auth', authRoutes)
app.use('/profile', profRoutes)

app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});

export {
    app
}