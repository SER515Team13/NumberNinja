/**
 * @author Saksham Jhawar <sjhawar2@asu.edu>
 *          Fetch and remove assignment for teacher.
 * @author Sukhpreet Anand <ssanand3@asu.edu>
 *          Add and edit assignment for teacher.
 * @author Abhinaw Sarang <asarang@augments.edu>
 *          Fetch assignment for logged in student.
 *          Fetch assignment for teacher based on the class he is assigned.
 */

var mongoose = require("mongoose");
var express = require('express');
var Assignment = require('../models/assignment');
var router = express.Router();
var StudentAssignment = require('../models/student-assignment');
var StudentAssignmentQuestion = require('../models/studentAssignmentQuestion');


router.get('/getassignments', function (req, res, next) {
  console.log("Getting assignments for teacher");
  console.log(req.query.email);
  let promise = Assignment.find({createdby: req.query.email},
    { id: 1, name: 1, grade: 1, duedate: 1 }).sort({ id: -1 }).exec();
  promise.then(function (doc) {
    console.log("Got assignments for teacher");
    console.log(doc);
    if (doc) {
      return res.status(200).json(doc);
    }
  });

  promise.catch(function (err) {
    return res.status(err.status).json({
      message: err.message +
        ' Error in getting list of assignments for teacher'
    });
  })
})


router.get('/getassignments-status', function (req, res, next) {
  console.log("Getting assignments status");
  console.log(req.query.aName);
  console.log(req.query.sEmail);
  let promise = StudentAssignmentQuestion.find({assignmentName: req.query.aName, studentEmail: req.query.sEmail}, {})
  promise.then(function (doc) {
    console.log("Got each question status for assignment.");
    console.log(doc);
    if (doc) {
      for(var each = 0; each < doc.length; each++) {
        if(doc[each].isSolved == false) {
          return res.status(200).json({assignmentStatus: false});
        }
      }
      return res.status(200).json({assignmentStatus: true});
    }
    return res.status(200).json({assignmentStatus: false});
  });
  promise.catch(function (err) {
    return res.status(err.status).json({
      message: err.message +
        ' Error in getting list of assignments for student.'
    });
  })
})
router.get('/getassignments-student', function (req, res, next) {
  console.log("Getting assignments for student");
  console.log(req.query.grade);
  console.log(req.query.email);
  let promise = Assignment.aggregate([
    {$match : {grade : req.query.grade}},
    {$lookup: {from: "student-assignment", localField: "assignmentName", foreignField: "name", as: "studentAssignment"}},
    {$project : {
            studentAssignment : { $filter : {input : "$studentAssignment"  , as : "sa", cond : { $eq : ['$$sa.studentEmail' , req.query.email] } } },
            name : 1,
            duedate : 1 }},
    {$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$studentAssignment", 0 ] }, "$$ROOT" ] } }}
    ]).exec();
  promise.then(function (doc) {
    console.log("Got assignments for student");
    console.log(doc);
    if (doc) {
      return res.status(200).json(doc);
    }
  });

  promise.catch(function (err) {
    return res.status(err.status).json({
      message: err.message +
        ' Error in getting list of assignments for student.'
    });
  })
})

router.post('/addassignment', function (req, res, next) {
  console.log("Storing assignment into database", req.query.email);
  var assignments = mongoose.model("assignments", Assignment.schema);
  var assignmentToStore = new assignments({
    name: req.body.name,
    description: req.body.description,
    duedate: req.body.duedate,
    grade: req.body.grade,
    createdby: req.query.email,
  });

  let assignmentPromise = assignmentToStore.save();

  assignmentPromise.then(function (doc) {
    return res.status(201).json(doc);
  })

  assignmentPromise.catch(function (err) {
    return res.status(err.status).json({
      message: err.message +
        ' Error in storing assignment.'
    })
  })
})

router.post('/editassignment', function (req, res, next) {
  console.log("Updating assignment in the database");
  var assignments = mongoose.model("assignments", Assignment.schema);
  console.log("ID is" + req.body._id)

  let assignmentPromise = assignments.updateOne(
    { _id: req.body._id },
    {
      $set:
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
    return res.status(err.status).json({
      message: err.message +
        ' Error in updating assignment.'
    })
  })
});

router.post('/deleterow', function (req, res, next) {
  var assignments = mongoose.model("assignments", Assignment.schema);
  let promise = assignments.deleteOne({ id: req.body.Id }).exec();
  promise.then(function (doc) {
    if (doc) {
      return res.status(200).json(doc);
    }
  })
});

router.post('/getquestions', function (req, res, next) {
  var questions = mongoose.model("questions", Question.schema);
  let promise = assignments.find({ id: req.body.Id }).exec();
  promise.then(function (doc) {
    if (doc) {
      return res.status(200).json(doc);
    }
  })
  promise.catch(function (err) {
    return res.status(err.status).json({
      message: err.message +
        ' Error in getting questions.'

    })
  })
})

module.exports = router;