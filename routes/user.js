const
  express = require('express'),
  userRouter = new express.Router(),
  passport = require('passport')
//

userRouter.route('/signup')
  .get((req, res) => {
    res.render('signUp', {message: req.flash('signup-message')})
  })
  .post(passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }))
//

userRouter.route('/login')
  .get((req, res) => {
    res.render('login', {message: req.flash('login-message')})
  })
  .post(passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }))
//

userRouter.route('/dashboard')
  .get((req, res) => {
    res.render('user/dashboard')
  })


module.exports = userRouter

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } 
  res.redirect('/')
}
