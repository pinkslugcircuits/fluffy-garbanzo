
const login = async (req, res, next) => {
    res.render('login', { user: req.user });
}

const logout = async (req, res, next) => {
    // handle with passport
    res.send('logging out');
}

const logInGoogle = async (req, res, next) => {
    // handle with passport
    res.send('logging in with Google');
}

const logInGithub = async (req, res, next) => {
    // handle with passport
    res.send('logging in with GitHub');
}

export {
    login,
    logout,
    logInGoogle,
    logInGithub
}