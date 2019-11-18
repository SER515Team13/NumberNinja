var mongoose = require("mongoose");
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var Question = require('../models/question');
const { sqrt } = require('mathjs')
const { create, all } = require('mathjs')
const math = create(all)

router.post('/evaluateEquation', function(req, res, next) {
    const regex = /√/gm;
    var dataJson = req.body.data;
    dataJson = dataJson.replace(regex,'sqrt');
    return res.status(200).json(math.evaluate(dataJson));
})

router.get('/getquestions', function(req,res,next) {
    console.log("Inside questions server api");
    console.log(req.query.id);
    console.log(req.query.email);
    //let promise = Question.find({assignmentID: req.query.id},{id:1,formula:1,formulaType:1}).exec();
    let promise = Question.aggregate([
      {$match : {assignmentID: req.query.id}},
      {$lookup: {from: "studentassignmentquestions", localField: "_id", foreignField: "questionId", as: "aq"}},
      {$project : {
              studentAssignmentQuestion : { $filter : {input : "$aq"  , as : "saq", cond : { $eq : ['$$saq.studentEmail' , req.query.email] } } },
              formulaWithBlanks: 1,
              formulaType: 1,
              formula: 1
            }},
      {$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$studentAssignmentQuestion", 0 ] }, "$$ROOT" ] } }}
      ]).exec();
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

router.get('/getquestion', function(req,res,next) {
  console.log("Inside question server api");
  console.log(req.query.id);
  let promise = Question.findOne({id: req.query.id},{id:1, answers:1, formula:1, formulaWithBlanks:1, formulaType:1}).exec();
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

router.post('/addquestion',  function(req,res,next){
  console.log("Storing question into Database");
  var questions = mongoose.model("questions", Question.schema);
  var questionToStore = new questions({
    formula: req.body.formula,
    formulaWithBlanks: req.body.formulaWithBlanks,
    formulaType: req.body.formulaType,
    answers: req.body.answers,
    assignmentID: req.body.assignmentID
  });
  console.log(questionToStore);

  let questionPromise = questionToStore.save();

  questionPromise.then(function (doc) {
    return res.status(201).json(doc);
  })

  questionPromise.catch(function (err) {
    return res.status(501).json({ message: 'Error storing question.' })
  })

})

router.post('/editquestion',  function(req,res,next){
  console.log(req.body);
  var questions = mongoose.model("questions", Question.schema);
  console.log("ID is" + req.body.id)

  let questionPromise = questions.updateOne(
    {_id : req.body.id},
    {$set:
      {formula: req.body.formula,
      formulaType: req.body.formulaType,
      formulaWithBlanks: req.body.formulaWithBlanks,
      answers: req.body.answers}
    }).exec();

  questionPromise.then(function (doc) {
    return res.status(201).json(doc);
  })

  questionPromise.catch(function (err) {
    return res.status(501).json({ message: err + 'Error Updating question.' })
  })
})

router.post('/deleterow',function(req,res,next) {
  console.log("In server delete");
  var assignments = mongoose.model("questions", Question.schema);
  let promise = assignments.deleteOne({id: req.body._id}).exec();
  promise.then(function(doc) {
    if(doc) {
      return res.status(200).json(doc);
    }
  })
});

module.exports = router;