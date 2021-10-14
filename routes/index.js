var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require('./users')
var passportLocal = require('passport-local')
passport.use(new passportLocal(User.authenticate()));

router.get('/' , function(req,res,next){
  res.render('index');
});

router.post('/register' , function(req,res ,next){
var newUser = new User({
  name  : req.body.name,
  username : req.body.username
  })
  User.register(newUser , req.body.password)
    .then(function(registeredUser){
      passport.authenticate('local')(req,res,function(){
        res.redirect('/profile')
      })
    })
})

router.post('/login' , passport.authenticate('local' , {
  successRedirect : '/profile',
  failureRedirect : '/'
}) ,function(req,res){})

router.get('/logout' , function(req,res){
  req.logOut();
  res.redirect('/')
})

router.get('/profile' , isloggedin , function(req , res){
res.render('profile')
})

function isloggedin(req , res ,next){
  if(req.isAuthenticated()){
    return next();
  }
  else{
    res.redirect('/')
  }
}

module.exports = router;