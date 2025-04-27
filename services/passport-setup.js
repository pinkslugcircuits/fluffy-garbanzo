import passport from 'passport'
import google from 'passport-google-oauth20'
const GoogleStrategy = google.Strategy

passport.use(
    new GoogleStrategy({
        // options for google strategy
    }, () => {
        // passport callback function
    })
);