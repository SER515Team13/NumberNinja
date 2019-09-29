var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');

/* POST API to register user details to users collection of 
 * MongoDB database and also check whether the user's email
 * is registered before.
 */
router.post('/register',  function(req,res,next){
  var user = new User({
    email: req.body.Email,
    userName: req.body.UserName,
    password: User.hashPassword(req.body.Password),
    firstName: req.body.FirstName,
    lastName: req.body.LastName,
    role: null,
    creationDate: Date.now()
  });

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
      let userpromise = user.save();

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
      console.log("isValid: "+ doc.isValid(req.body.Password));
      if(doc.isValid(req.body.Password)) {
        // generate token
        let token = jwt.sign({Email:doc.Email},'secret', {expiresIn : '3h'});
        return res.status(200).json(token);
      } else {
        return res.status(501).json({message:' Invalid Credentials'});
      }
    } else {
      return res.status(501).json({message:'User email is not registered.'});
    }
  });

  promise.catch(function(err) {
    console.log("promise catch");
    return res.status(501).json({message:'Some internal error'});
  })
})

/* GET API to verify and fetch the decoded authentication token 
 * of user's login session.
 */
router.get('/verifyToken', verifyToken, function(req,res,next){
  return res.status(200).json(decodedToken.Email);
})

var decodedToken='';
function verifyToken(req,res,next){
  let token = req.query.token;

  jwt.verify(token,'secret', function(err, tokendata) {
    if (err) {
      return res.status(400).json({message:' Unauthorized request'});
    }
    if (tokendata) {
      decodedToken = tokendata;
      next();
    }
  })
}

module.exports = router;
