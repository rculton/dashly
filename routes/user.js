const
  express = require('express'),
  userRouter = new express.Router(),
  passport = require('passport'),
  httpClient = require('request'),
  User = require('../models/User.js'),
  objectAssign = require('object-assign');
//

userRouter.route('/')
  //update the user
.patch((req, res) => {
  User.findById(req.user._id, (err, user) => {
    if(err) return console.log(err)
    debugger
    console.log(req.user.body)
    //Only allow a change if the password is a valid password
    if (!!user.validPassword(req.body.verifyPassword)) {
      //remove the "verify password" as soon as it's verified
      delete req.body['verifyPassword'];
      //set the body password to the hash of the body password (if there is one)
      req.body.password = user.generateHash(req.body.password)
      //combine the current user with the changes
      var updatedUser = objectAssign(user, req.body)
      //save the user
      updatedUser.save((err, updateUser) => {
        if(err) return console.log(err)
        console.log('updated user')
        //and return a success message
        res.send({success: true})
      })
    }
    //if the password is invalid...
    else{
      //send a message of failure
      res.send({success: false})
    }
  })
})
  //delete the user
.delete((req, res) =>{
  User.findByIdAndRemove(req.user._id, (err)=>{
    if(err) return console.log(err)
    req.logout()
    res.send({success: true})
  })
})

//signup route
userRouter.route('/signup')
  .all(isLoggedOut)
  .get((req, res) => {
    res.render('signup', {message: req.flash('signup-message')})
  })
  //post the user via passport
  .post(passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup',
    failureFlash: true
  }))
//

//login route
userRouter.route('/login')
  .all(isLoggedOut)
  .get((req, res) => {
    res.render('login', {message: req.flash('login-message')})
  })
  //authenticate the user, redirect based on result
  .post(passport.authenticate('local-login', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  }))
//

//get the dashboard
userRouter.route('/dashboard')
  .get((req, res) => {
      res.render('user/dashboard', {
        user: req.user
      })
  }),
//

//get the page to edit a user
userRouter.route('/editUser')
  .all(isLoggedIn)
  .get((req, res) => {
      res.render('user/userEdit', {
        user: req.user,
        message: ''
      })
  })

  //logout page
userRouter.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

//export routes
module.exports = userRouter

//function to check if user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } 
  res.redirect('/')
}

function isLoggedOut(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  } 
  res.redirect('/dashboard')
}
