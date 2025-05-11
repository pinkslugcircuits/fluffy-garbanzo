const profile = async (req, res, next) => {
    res.locals.title = 'Profile'
    res.render('pages/profile', { user: req.user })
}

export {
    profile
}