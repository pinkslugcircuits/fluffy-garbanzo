import  https from 'https'
import { app }  from './server.js'
const port = 3001
import  fs from 'fs'

// Creating object of key and certificate
// for SSL
const options = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert"),
};

// Creating https server by passing
// options and app object
https.createServer(options, app)
    .listen(port, '0.0.0.0', function (req, res) {
        console.log(`Server started at port ${port}`);
});
