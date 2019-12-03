/**
 * @author Sukhpreet Anand <ssanand3@asu.edu>
 *          Login, signin API added
 * @author Abhinaw Sarang <asarang@augments.edu>
 *          Modified signup to get grade and email
 * @author Sagar Khar <skhar@asu.edu>
 *           Fetch the user information to display on the admin screen
 */

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
  grade: String,
  creationDate: Date,
  password: String,
})

/* Get API to get user details of users that are not accepted.
 */

router.get('/getalldata', function(req,res,next) {
  console.log("Inside server api");
  console.log(req.body);
  let promise = User.find({role:null},{firstName:1,lastName:1,email:1,role:1,grade:1}).exec();
  promise.then(function(doc) {
    console.log("inside promise");
    console.log(doc);
    if(doc) {
      return res.status(200).json(doc);
    }
  });

  promise.catch(function(err){
    return res.status(501).json({message:'Some internal error'});
  })
})

/* GET API to fetch users that are approved by admin.
 */

router.get('/getExistingData', function(req,res,next) {
  console.log(req.body);
  let promise = User.find({role: {$ne:null}},{firstName:1,lastName:1,email:1,role:1,grade:1}).exec();
  promise.then(function(doc) {
    console.log("inside2 promise");
    console.log(doc);
    if(doc) {
      return res.status(200).json(doc);
    }
  });

  promise.catch(function(err){
    return res.status(501).json({message:'Some internal error'});
  })
})


router.post('/addRole',function(req,res,next){
  console.log("inside allrole");
  var data = req.body;  
  console.log(data.grade);
  if(data['flag'] === true) {
    let promise = User.updateOne({email:data.email},{$set:{role:data.role,grade:data.grade}}).exec();
    promise.then(function(doc) {
      if(doc) {
        return res.status(200).json(doc);
      }
    })
  } else {
    let promise = User.deleteOne({email:data.email}).exec();
    promise.then(function(doc) {
      if(doc) {
        return res.status(200).json(doc);
      }
    })
  }
});
 
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
    grade: null,
    creationDate: Date.now(),
    password: User.hashPassword(req.body.password)
  });

  console.log(userToStore);

  console.log("Email: "+ req.body.Email);
  console.log("UserName: "+ req.body.UserName);
  console.log("Password: "+ req.body.Password);
  console.log("FirstName: "+ req.body.FirstName);
  console.log("LastName: "+ req.body.LastName);

  let promise = User.findOne({email:req.body.email}).exec();
  promise.then(function(doc) {
    if(doc) {
      console.log(doc);
      return res.status(220).json({message:'This email is already registered.'});
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
        let userGrade =doc.grade;
        let userEmail = doc.email;
        console.log(token);
        return res.status(200).json({token: token, role: userRole, userGrade: userGrade, userEmail: userEmail});
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
