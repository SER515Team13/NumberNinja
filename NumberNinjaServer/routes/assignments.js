var mongoose = require("mongoose");
var express = require('express');
var Assignment = require('../models/assignment');
var router = express.Router();



router.get('/getassignments', function(req,res,next) {
  console.log("Inside server api");
  console.log(req.body);
  let promise = Assignment.find({},{id:1,name:1,grade:1,duedate:1}).exec();
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


router.post('/deleterow',function(req,res,next){
    var assignments = mongoose.model("assignments", Assignment.schema);
    let promise = assignments.deleteOne({id: req.body.Id}).exec();
    promise.then(function(doc) {
      if(doc) {
        return res.status(200).json(doc);
      }
    })
});

module.exports = router;