import  https from 'https'
import { app }  from './server.js'
import  fs from 'fs'
import 'dotenv/config'
import mongoose from 'mongoose'

//db setup
var optionsDB = {
    user: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASSWORD
  };

// Creating object of key and certificate
// for SSL
const optionsSSL = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert"),
};

// Creating https server by passing
// options and app object
const port = process.env.PORT

try {
    await mongoose.connect(process.env.MONGODB_URI + '?authSource=admin',optionsDB)
    console.log('connected to db')
    https.createServer(optionsSSL, app)
    .listen(port, '0.0.0.0', function (req, res) {
        console.log(`Server started at port ${port}`);
});
} catch (error) {
    console.error(error)
}