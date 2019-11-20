var mongoose = require("mongoose");
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var Question = require('../models/question');
const { sqrt } = require('mathjs');
const { create, all } = require('mathjs');
const math = create(all);
var StudentAssignmentQuestion = require('../models/studentAssignmentQuestion');

router.post('/evaluateEquation', function(req, res, next) {
    console.log(req.body);
    const regex = /√/gm;
    var dataJson = req.body.data;
    dataJson = dataJson.replace(regex,'sqrt');
    console.log("Answer: " + math.evaluate(dataJson));
    return res.status(200).json(math.evaluate(dataJson));
})

router.get('/getquestions', function(req,res,next) {
    console.log("Inside questions server api");
    console.log(req.query.id);
    console.log(req.query.email);
    let promise = Question.aggregate([
      {$match : {assignmentID: req.query.id}},
      {$lookup: {from: "studentassignmentquestions", localField: "_id", foreignField: "questionId", as: "aq"}},
      {$project : {
              studentAssignmentQuestion : { $filter : {input : "$aq"  , as : "saq", cond : { $eq : ['$$saq.studentEmail' , req.query.email] } } },
              formulaWithBlanks: 1,
              formulaType: 1,
              formula: 1,
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


router.get('/gettotalquestions', function (req, res, next) {
  console.log("Getting total questions with id");
  console.log(req.query.aId);
  let prom = Question.aggregate([
    {$match : {assignmentID : req.query.aId}},
    {$group: {_id: {assignmentID: "$assignmentID"}, totalQues: {$sum: 1 }}},
  ]).exec();
  prom.then(function (doc) {4
    console.log(doc);
    return res.status(200).json(doc);
   })
  });

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

  let questionPromise = questionToStore.save((err, doc) => {
    const { _id } = doc;
    console.log(`New question id: ${_id}`);
    return res.status(201).json(doc);
  });

  //questionPromise.catch(function (err) {
  //  return res.status(501).json({ message: 'Error storing question.' })
  //})

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
  console.log("In server delete"+ req.query.questionId);
  var assignments = mongoose.model("questions", Question.schema);
  let promise = assignments.deleteOne({_id: mongoose.Types.ObjectId(req.query.questionId)}).exec();
  promise.then(function(doc) {
    if(doc) {
      return res.status(200).json(doc);
    }
  })
});

router.post('/addStudentQuestion', function (req, res, next) {
  console.log("Storing question for student into database", req.query.email);
  var StudentQuestion = mongoose.model("studentassignmentquestions", StudentAssignmentQuestion.schema);
  var questionToStore = new StudentQuestion({
    studentEmail : req.query.email,
    assignmentId : req.query.assignmentId,
    questionId: mongoose.Types.ObjectId(req.query.questionId),
    isSolved: false,
    isCorrect: false
  });

  questionToStore.save((err, doc) => {
    console.log(doc);
    console.log(err);
    return res.status(201).json(doc);
  });
})

module.exports = router;