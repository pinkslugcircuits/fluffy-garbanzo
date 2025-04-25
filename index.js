// app.js

// Requiring in-built https for creating
// https server
const https = require("https");

// Express for handling GET and POST request
const express = require("express");
const app = express();

// Requiring file system to use local files
const fs = require("fs");

// Parsing the form of body to take
// input from forms
const bodyParser = require("body-parser");
// Configuring express to use body-parser
// as middle-ware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mongoose for connecting to our database
const mongoose = require("mongoose");

const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

// Below all the app.use methods
app.use(session({
    secret : "any long secret key",
    resave : false,
    saveUninitialized : false
}));

// Initializing Passport
app.use(passport.initialize());

// Starting the session
app.use(passport.session());

// Creating user schema and adding a plugin to it

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});
userSchema.plugin(passportLocalMongoose);


    

// Connecting mongoose to our database
// named "userDatabase"
mongoose.connect(
    'mongodb://localhost:27017/userDatabase', {
    });

// Creating the User model. 
const User = new mongoose.model("User", userSchema); 
passport.use(User.createStrategy());

// Serializing and deserializing
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




/* setting a simple get request on the home route, 
and sending our index.html file containing a form 
which will allow user to enter his details and 
register. */
app.get("/", function (req, res) {
    /* req.isAuthentcated() returns true or 
    false depending upon whether a session 
    is already running or not.*/
    if(req.isAuthenticated()) {
   
      /* if the request is already authenticated, 
      i.e. the user has already logged in and 
      there is no need to login again. Or we 
      can say, the session is running. */  
      res.send("You have already logged in. No need to login again");
    }    
    else{
  
      // If the user is new and no session
      // is Running already 
      res.sendFile(__dirname + "/index.html");
    }
})

// Handling get request on login route
app.get("/login", function(req, res) {
    if(req.isAuthenticated()){
        /* if request is already authenticated, 
        i.e. user has already logged in and 
        there is no need to login again. */ 
        res.send("You have already logged in. No need to login again");
     }
     else{
       res.sendFile(__dirname + "/login.html");
   }
})
    
// Handling the post request on /register route. 
/* The index.html file will be same as that
used in the earlier method of authentication*/ 
app.post("/register", function(req, res){
    console.log(req.body);
    
    // Getting Email and PAssword Entered by user
    var email = req.body.username;
    var password = req.body.password;
    
    /* Registering the user with email and
    password in our database  
    and the model used is "User" */
    User.register({ username : email }, 
    req.body.password, function (err, user) {      
      if (err) {      
        // if some error is occurring, log that error
        console.log(err);
      }
      else {
        passport.authenticate("local")
        (req, res, function() {
          res.send("successfully saved!"); 
        })
      }
    })
})
    
// All handling related to login is done below.
// Here we are handling the post request on
// /login route
app.post("/login", function (req, res) {
    console.log(req.body);
  
    const userToBeChecked = new User({
      username: req.body.username,
      password: req.body.password,
    });
  
    // Checking if user if correct or not
    req.login(userToBeChecked, function (err) {
      if (err) {
  
        console.log(err);
        
        // If authentication fails, then coming
        // back to login.html page
        res.redirect("/login");
      } else {
        passport.authenticate("local")(
          req, res, function () {
          User.find({ email: req.user.username }, 
            function (err, docs) {
            if (err) {
              console.log(err);
            } else {
              //login is successful
              console.log("credentials are correct");
              res.send("login successful");
            }
          });
        });
      }
    });
}); 

// Creating object of key and certificate
// for SSL
const options = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert"),
};

// Creating https server by passing
// options and app object
https.createServer(options, app)
    .listen(3001, 'localhost', function (req, res) {
        console.log("Server started at port 3001");
});
