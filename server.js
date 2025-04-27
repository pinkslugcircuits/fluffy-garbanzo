//imports
import express from 'express'
import { authRoutes } from './routes/auth-routes.js'
import path from 'path'

//server setup
const app = express()
app.use(express.static('views'))
app.set('view engine', 'ejs')

//routes
app.use('/auth', authRoutes)

app.get('/', (req, res) => {
    res.render('home');
});

export {
    app
}