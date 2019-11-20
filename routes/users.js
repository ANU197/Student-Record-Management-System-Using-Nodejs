const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// User Model
const User = require('../models/User');

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Resgister Page
router.get('/register', (req, res) => res.render('register'));



// Register handle
router.post('/register', (req, res) => {
    const {name, email, password, password2, gender, father, address, mobile} = req.body;
    let errors = [];

    // check requried fields
    if(!name || !email || !password || !password2 || !gender || !father || !address || !mobile)
    {
        errors.push({msg : 'Please fill all fields'});
    }

    //check password match
    if(password != password2)
    {
        errors.push({ msg: 'Password do not match'});

    }
    if(password.length < 6){
        errors.push({ msg: 'Password atleast should be 6 characters'});

    }
     if(mobile.length != 10)
    {
        errors.push({ msg: 'Mobile Number Must Contain 10 digits'});
    }
    if(errors.length > 0){
       res.render('register', {
           errors,
           name,
           email,
           password,
           password2
       });
       
    }else{
        // validation passed
        User.findOne({email: email })
           .then(user =>{
               if(user){
                   //user exists
                   errors.push({msg: 'Email is already registered'});
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
               }
               else{
                   const newUser = new User({
                       name,
                       email,
                       password,
                       gender,
                       father,
                       address,
                       mobile
                   });
                   // hash password
                   bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                       if(err) throw err;
                       newUser.password = hash;
                       // save the user
                       newUser.save()
                          .then(user => {
                              req.flash('success_msg','You are now registerd and can log in');
                              res.redirect('/users/login');
                          })
                          .catch(err => console.log(err));
                   }))

               }
           });

    }

});

// login handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });


  // Logout
  router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });

module.exports = router;
