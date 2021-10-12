var express = require('express');
var router = express.Router();
var userModel = require('./users')
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/register' , function(req,res){
  userModel.create({
    name : req.body.name,
    password : req.body.password
  }).then(function(createdUser){
      res.send(createdUser);
    })
})

router.get('/users' , function(req,res){
  userModel.find()
    .then(function(allusers){
      res.render('users' , {allusers : allusers})
    })
});

router.get('/delete/:id' , function(req ,res){
userModel.findOneAndDelete({_id : req.params.id})
    .then(function(deletedUser){
      res.redirect('/users')
      res.send(deletedUser)

    })
})

router.get('/update/:id' , function(req,res){
  userModel.findOne({_id : req.params.id })
     .then(function(foundUser){
       res.render('update' , {foundUser: foundUser})
     })
})

router.post('/updateuser/:id' , function(req,res){
  userModel.findOneAndUpdate({_id : req.params.id} , {name : req.body.name , password: req.body.password })
        .then(function(updatedUser){
          res.redirect('/users')
        })
})



module.exports = router;