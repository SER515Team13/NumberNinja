var mongoose = require("mongoose");
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var Question = require('../models/question');

router.get('/getquestions', function(req,res,next) {
    console.log("Inside question server api");
    console.log(req.body);
    let promise = Question.find({},{id:1,formula:1,formulaType:1}).exec();
     promise.then(function(doc) {
      console.log("insdie promise");
      console.log(doc);
      if(doc) {
        return res.status(200).json(doc);
      }
    });

    promise.catch(function(err){
      return res.status(501).json({message:'Some internal error'});
    })
})

module.exports = router;