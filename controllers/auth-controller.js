import passport from 'passport'

const login = async (req, res, next) => {
    res.locals.title = 'Log-in'
    res.render('pages/login', { user: req.user });
}

const logoutControl = async (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    })
}

const logInGithub = async (req, res, next) => {
    // handle with passport
    res.send('logging in with GitHub');
}

export {
    login,
    logoutControl,
    logInGithub
}