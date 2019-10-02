var mongoose = require("mongoose");
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;
var registrationSchema = new Schema({
  email: String,
  userName: String,
  firstName: String,
  lastName: String,
  role: String,
  creationDate: Date,
  password: String
})

/* POST API to register user details to users collection of 
 * MongoDB database and also check whether the user's email
 * is registered before.
 */

router.get('/getalldata', function(_,res) {
  console.log("Inside server api");

  // const numberObservable = new Observable((observer) => {
  //   observer.User.find({},{firstName:1,lastName:1,email:1,role:1}).exec(function(doc) {
  //     return res.status(200).json(doc);
  //   });
  // });

// numberObservable.subscribe(value => console.log(value));

  let promise = User.find({},{firstName:1,lastName:1,email:1,role:1}).exec();
  promise.then(function(doc) {
    console.log("insdie promise");
    console.log(doc);
    if(doc) {
      return doc;
    }
  });
  // User.find({},{firstName:1,lastName:1,email:1,role:1}).exec(function(err,docs) {
  //   console.log(docs);
  //   return res.json(docs);
  // });
  // promise.then(function(doc) {
  //   return doc;
  // })

})
 
router.post('/register',  function(req,res,next){
  console.log(req.body);
  var user = mongoose.model("user",registrationSchema);
  console.log("hi2");
  var userToStore = new user({
    email: req.body.email,
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: null,
    creationDate: Date.now(),
    password: User.hashPassword(req.body.password)
  });
  console.log("hi3");

  console.log(userToStore);

  console.log("Email: "+ req.body.Email);
  console.log("UserName: "+ req.body.UserName);
  console.log("Password: "+ req.body.Password);
  console.log("FirstName: "+ req.body.FirstName);
  console.log("LastName: "+ req.body.LastName);

  let promise = User.findOne({email:req.body.Email}).exec();
  promise.then(function(doc) {
    if(doc) {
      return res.status(501).json({message:'This email is already registered.'});
    } else {
      let userpromise = userToStore.save();

      userpromise.then(function(doc){
        return res.status(201).json(doc);
      })

      userpromise.catch(function(err){
        return res.status(501).json({message: 'Error registering user.'})
      })      
    }
  });

  promise.catch(function(err){
    return res.status(501).json({message:'Some internal error'});
  })
})

/* POST API to login user details from users collection of 
 * MongoDB database and checks whether user is already registered
 * or not. It also generates an authentication token to verify 
 * the user's signin session.
 */
router.post('/login', function(req,res,next) {
  let promise = User.findOne({email:req.body.Email}).exec();

  console.log("Email: "+ req.body.Email);
  console.log("Password: "+ req.body.Password);

  promise.then(function(doc) {
    if(doc) {

      if(doc.role == null) {
        return res.status(501).json({message: 'User account is not approved yet.'});
      }

      if(doc.isValid(req.body.Password)) {
        // generate token
        let token = jwt.sign({Email:doc.Email}, 'secret', {expiresIn : '3h'});
        let userRole = doc.role;
        console.log(token);
        return res.status(200).json({token: token, role: userRole});
      } else {
        return res.status(501).json({message: 'Incorrect email or password.'});
      }
    } else {
      return res.status(501).json({message: 'User email is not registered.'});
    }
  });

  promise.catch(function(err) {
    console.log("promise catch");

    return res.status(501).json({message: 'Some internal error'});
  })
})

/* GET API to verify and fetch the decoded authentication token 
 * of user's login session.
 */
router.get('/verifyToken', verifyToken, function(req,res,next) {
  return res.status(200).json(decodedToken.Email);
})

var decodedToken='';
function verifyToken(req,res,next) {
  let token = req.query.token;

  jwt.verify(token,'secret', function(err, tokendata) {
    if (err) {
      return res.status(400).json({message: 'Unauthorized request'});
    }
    if (tokendata) {
      decodedToken = tokendata;
      next();
    }
  })
}

module.exports = router;
