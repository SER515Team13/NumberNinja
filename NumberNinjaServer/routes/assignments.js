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

router.post('/addassignment',  function(req,res,next){
  console.log("Storing assignment into database");
  var assignments = mongoose.model("assignments", Assignment.schema);
  var assignmentToStore = new assignments({
    name: req.body.name,
    description: req.body.description,
    duedate: req.body.duedate,
    grade: req.body.grade,
  });

  let assignmentPromise = assignmentToStore.save();

  assignmentPromise.then(function (doc) {
    return res.status(201).json(doc);
  })

  assignmentPromise.catch(function (err) {
    return res.status(501).json({ message: 'Error storing assignment.' })
  })
})

router.post('/editassignment',  function(req,res,next){
  console.log("Updating assignment in the database");
  var assignments = mongoose.model("assignments", Assignment.schema);
  console.log("ID is" + req.body._id)

  let assignmentPromise = assignments.updateOne(
    {_id : req.body._id},
    {$set:
      {
        name: req.body.name,
        description: req.body.description,
        duedate: req.body.duedate,
        grade: req.body.grade,
      }
    }).exec();

  assignmentPromise.then(function (doc) {
    return res.status(201).json(doc);
  })

  assignmentPromise.catch(function (err) {
    return res.status(501).json({ message: err + 'Error Updating assignment.' })
  })
});

router.post('/deleterow',function(req,res,next){
    var assignments = mongoose.model("assignments", Assignment.schema);
    let promise = assignments.deleteOne({id: req.body.Id}).exec();
    promise.then(function(doc) {
      if(doc) {
        return res.status(200).json(doc);
      }
    })
});

router.post('/getquestions',function(req,res,next){
  var questions = mongoose.model("questions",Question.schema);
  let promise = assignments.find({id: req.body.Id}).exec();
    promise.then(function(doc) {
      if(doc) {
        return res.status(200).json(doc);
      }
    })
})

module.exports = router;