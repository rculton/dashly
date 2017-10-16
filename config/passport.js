const
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  User = require('../models/User.js')
//

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})

// for sign up
passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    console.log(req)
    User.findOne({email: email}, (err, user) => {
        if(err) return done(err)
        if(user) return done(null, false, req.flash('signup-message', 'Sorry that email is taken!'))
        var newUser = new User(req.body)
        newUser.password = newUser.generateHash(password)
        newUser.save((err) => {
            if(err) return console.log(err)
            return done(null, newUser)
        })
    })
}))

// for log in
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    if(err) return done(err)
    if(!user || !user.validPassword(password)) {
        return done(null, false, req.flash('login-message', 'Sorry incorrect email or password'))
    }

    return done(null, user)
}))

module.exports = passport
//this is a test comment