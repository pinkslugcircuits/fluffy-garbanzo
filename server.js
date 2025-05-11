//imports
import express from 'express'
import bodyParser from 'body-parser'
import 'dotenv/config'
import fileupload from 'express-fileupload'

import passport from 'passport'
import { GoogleStrategy } from './services/passport-setup.js'
import expressSession from 'express-session'

import { authRoutes } from './routes/auth-routes.js'
import { profRoutes } from './routes/profile-routes.js'
import { categoryRoute } from './routes/category-routes.js'
import { categoryAPIRoute } from './routes/category-API-routes.js'
import { productRoute } from './routes/product-routes.js'
import { productAPIRoute } from './routes/product-API-routes.js'

//server setup
const app = express()
app.use('/public', express.static('public'))
app.use('/files', express.static('files'))
app.use(express.static('views'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileupload())
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
app.use('/categories', categoryRoute)
app.use('/products', productRoute)

app.use('/api/v1/categories', categoryAPIRoute)
app.use('/api/v1/products', productAPIRoute)

app.get('/aboutUs', async (req, res) => {
    res.locals.title = 'About Us'
    res.render('pages/aboutUs')
})

app.get('/contactUs', async (req, res) => {
    res.locals.title = 'Contact Us'
    res.render('pages/contactUs')
})

app.get('/', (req, res) => {
    res.locals.title = 'Home'
    res.render('pages/home', { user: req.user })
});

export {
    app
}