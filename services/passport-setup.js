import passport from 'passport'
import google from 'passport-google-oauth20'
const GoogleStrategy = google.Strategy
import 'dotenv/config'
import { user } from '../models/model-user.js'

passport.serializeUser((user,done) => {
    done(null, user.id)
})

passport.deserializeUser((id,done) => {
    user.findById(id).then((user) => {
        done(null, user)
    })    
})

passport.use(new GoogleStrategy({
    callbackURL: 'https://localhost:3001/auth/google/redirect',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
}, (accessToken, refreshToken, profile, done) => {
    user.findOne({googleID: profile.id}).then((currentUser) => {
        if(currentUser){
            console.log('is current user', currentUser)
            done(null, currentUser)
        } else {
            new user({
                userName: profile.displayName,
                googleID: profile.id
            }).save().then((newUser) => {
                done(null, newUser)
            })
        }
    })
}))

export{
    GoogleStrategy
}
