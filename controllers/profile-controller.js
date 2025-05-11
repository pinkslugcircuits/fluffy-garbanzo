const profile = async (req, res, next) => {
    res.locals.title = 'Profile'
    console.log(req.user)
    res.render('pages/profile', { user: req.user })
}

export {
    profile
}