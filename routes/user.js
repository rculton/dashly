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
  // User.findById(req.user._id, (err, user) => {

    User.findByIdAndUpdate(req.user._id, req.body, {new: true}, (err, user) => {
      res.json({success: true})
    })
  // })
  // console.log("Incoming patch for updating profile:")
  // console.log(req.body)
  // User.findById(req.user._id, (err, user) => {
  //   if(err) return console.log(err)
  //   console.log("User to update:")
  //   console.log(user)

  //   console.log("The password verification:")
  //   console.log(req.body.verifyPassword)
  //   //Only allow a change if the password is a valid password
  //   if (!!user.validPassword(req.body.verifyPassword)) {
  //     console.log("Verified user's current password before updating...")
  //     //remove the "verify password" as soon as it's verified
  //     delete req.body['verifyPassword'];
  //     console.log("deleted req.body.verifyPassword")
  //     //combine the current user with the changes
  //     var updatedUser = Object.assign(user, req.body)
  //     console.log("Merging current user with req.body")
      
  //     //set the body password to the hash of the body password (if there is one)
  //     updatedUser.password = user.generateHash(req.body.password)
  //     console.log("generated hash for new password...")
  //     console.log(updatedUser.password)
  //     //save the user
  //     console.log("Saving user...")
  //     delete updatedUser._id
  //     delete updatedUser.__v
  //     delete updatedUser.topics
  //     console.log(updatedUser)

  //     updatedUser.save((err, updatedUser) => {
  //       if(err) return console.log(err)
  //       console.log('updated user')
  //       //and return a success message
  //       console.log(updatedUser)
  //       res.json({success: true})
  //     })
  //   }
  //   if(!user.validPassword(req.body.verifyPassword)) {
  //     res.json({success: false})
  //   }
  //   //if the password is invalid...
  //     //send a message of failure
  // })
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
userRouter.get('/dashboard', isLoggedIn, (req, res) => {
  res.render('user/dashboard', {user: req.user})
})
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
