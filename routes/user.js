const
  express = require('express'),
  userRouter = new express.Router(),
  passport = require('passport'),
  httpClient = require('request'),
  User = require('../models/User.js'),
  objectAssign = require('object-assign');
//
userRouter.route('/')
.patch((req, res) => {
  User.findById(req.user._id, (err, user) => {
    if(err) return console.log(err)
    debugger
    console.log(req.user.body)
    if (!!user.validPassword(req.body.verifyPassword)) {
      console.log(req.body.verifyPassword)
      delete req.body['verifyPassword'];
      console.log(req.body.password)
      req.body.password = user.generateHash(req.body.password)
      console.log(req.body.password)
      var updatedUser = objectAssign(user, req.body)
      console.log(updatedUser)
      updatedUser.save((err, updateUser) => {
        if(err) return console.log(err)
        console.log('updated user')
        res.send({success: true})
      })
    }
  })
})
.delete((req, res) =>{
  User.findByIdAndRemove(req.user._id, (err)=>{
    if(err) return console.log(err)
    req.logout()
    res.send({success: true})
  })
})

userRouter.route('/')
.patch((req, res) => {
  User.findById(req.user._id, (err, user) => {
    if(err) return console.log(err)
    debugger
    console.log(req.user.body)
    if (!!user.validPassword(req.body.verifyPassword)) {
      console.log(req.body.verifyPassword)
      delete req.body['verifyPassword'];
      console.log(req.body.password)
      req.body.password = user.generateHash(req.body.password)
      console.log(req.body.password)
      var updatedUser = objectAssign(user, req.body)
      console.log(updatedUser)
      updatedUser.save((err, updateUser) => {
        if(err) return console.log(err)
        console.log('updated user')
        res.send({success: true})
      })
    }
  })
})
.delete((req, res) =>{
  User.findByIdAndRemove(req.user._id, (err)=>{
    if(err) return console.log(err)
    req.logout()
    res.send({success: true})
  })
})

userRouter.route('/signup')
  .get((req, res) => {
    res.render('signup', {message: req.flash('signup-message')})
  })
  .post(passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup',
    failureFlash: true
  }))
//

userRouter.route('/login')
  .get((req, res) => {
    res.render('login', {message: req.flash('login-message')})
  })
  .post(passport.authenticate('local-login', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  }))
//

userRouter.route('/dashboard')
  .get((req, res) => {
    if (!!req.user){
      console.log(!!req.user)
      res.render('user/dashboard', {
        user: req.user
      })
    }
    else{
      res.redirect('/')
    }
  }),
//

userRouter.route('/editUser')
  .get((req, res) => {
    res.render('user/userEdit', {
      user: req.user,
      message: ''
    })
  })
<<<<<<< HEAD
=======
  // .patch((req, res) => {
  //   User.findById(req.user._id, (err, user) => {
  //     if(err) return console.log(err)
  //     debugger
  //     console.log(req.user.body)
  //     if (!!user.validPassword(req.body.verifyPassword)) {
  //       console.log(req.body.verifyPassword)
  //       delete req.body['verifyPassword'];
  //       console.log(req.body.password)
  //       req.body.password = user.generateHash(req.body.password)
  //       console.log(req.body.password)
  //       var updatedUser = objectAssign(user, req.body)
  //       console.log(updatedUser)
  //       updatedUser.save((err, updateUser) => {
  //         if(err) return console.log(err)
  //         console.log('updated user')
  //         res.redirect(303,'/dashboard')
  //       })
  //     }
  //   })
    // .delete((req, res) => {
    //   User.findByIdAndRemove(req.user._id, (err) => {
    //      if(err) return console.log(err)
    //   req.logout()
    //   res.redirect('/')
    //   })
    // })
  // })
  
>>>>>>> a45e026db7ab298338b468b7f4031b3c9d680fa1

userRouter.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

// userRouter.get('/delete', (req, res) => {
//   User.findByIdAndRemove(req.user, (err) => {
//     if(err) return console.log(err)
//     req.logout()
//     req.redirect('/')
//   })
  // User.findByIdAndRemove()  //add delete users
  // req.logout() // "kills session"
  // res.redirect('/')
//})

module.exports = userRouter

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } 
  res.redirect('/')
}
