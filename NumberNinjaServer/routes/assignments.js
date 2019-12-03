/**
 * @author Saksham Jhawar <sjhawar2@asu.edu>
 *          Fetch and remove assignment for teacher.
 * @author Sukhpreet Anand <ssanand3@asu.edu>
 *          Add and edit assignment for teacher.
 * @author Abhinaw Sarang <asarang@augments.edu>
 *          Fetch assignment for logged in student.
 *          Fetch assignment for teacher based on the class he is assigned.
 * @author Sagar Khar <skhar@asu.edu>
 *          Fetch assignments and the grades for those assignments
 */

var mongoose = require("mongoose");
var express = require('express');
var Assignment = require('../models/assignment');
var Question = require('../models/question');
var router = express.Router();
var StudentAssignment = require('../models/student-assignment');
var StudentAssignmentQuestion = require('../models/studentAssignmentQuestion');
var User = require('../models/user');


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

router.get('/getassignmentsgrade', function (req, res, next) {
  console.log("Getting assignments with id");
  console.log(req.query.aId);
  let promise = StudentAssignmentQuestion.aggregate([
    {$match : {assignmentId : req.query.aId}},
    {$lookup: {from: "users", localField: "studentEmail", foreignField: "email", as: "studentDetails"}},
    {$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$studentDetails", 0 ] }, "$$ROOT" ] } }},
    {$group: {_id: {studentEmail: "$studentEmail", firstName: "$firstName", lastName: "$lastName", isCorrect: "$isCorrect"}, correctAns: {$sum: 1 }}},
  ]).exec();
  promise.then(function (doc) {
    console.log(doc);
    return res.status(200).json(doc);
   })
})

router.get('/getgrade', function (req, res, next) {
  console.log(req.query.studentEmail+req.query.assignmentId);
  let promise = StudentAssignment.find({studentId: req.query.studentEmail, assignmentId: mongoose.Types.ObjectId(req.query.assignmentId)},
    { gradeReceived:1, studentId:1, assignmentId:1 }).exec();
  promise.then(function (doc) {
    console.log(doc);
    if (doc) {
      return res.status(200).json(doc);
    }
  });

  promise.catch(function (err) {
    return res.status(err.status).json({
      message: err.message +
        'Error in getting list of assignments for teacher'
    });
  })
})


router.get('/getassignments-status', function (req, res, next) {
  console.log("Getting assignments status"); 
  console.log(req.query.aId);
  console.log(req.query.sEmail);

  let promise = StudentAssignmentQuestion.find({assignmentId: req.query.aId, studentEmail: req.query.sEmail}).exec();
  promise.then(function (doc) {
    console.log("Got each question status for assignment.");
    console.log(doc);
    if (doc && doc != undefined && doc.length != 0) {
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
    {$lookup: {from: "studentassignments", localField: "_id", foreignField: "assignmentId", as: "studentAssignment"}},
    {$project : {
            studentAssignment : { $filter : {input : "$studentAssignment"  , as : "sa", cond : { $eq : ['$$sa.studentId' , req.query.email] } } },
            name : 1,
            duedate : 1,
            }},
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

  let assignmentPromise = assignmentToStore.save((err, doc) => {
    const { _id } = doc;
    console.log(`New assignment id: ${_id}`);
    return res.status(201).json(doc);
  });

  // assignmentPromise.catch(function (err) {
  //   return res.status(err.status).json({
  //     message: err.message +
  //       ' Error in storing assignment.'
  //   })
  // })
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
  console.log("In server delete"+ req.query.assignmentId);

  var sa = mongoose.model("studentassignments", StudentAssignment.schema);
  sa.deleteMany({ assignmentId: mongoose.Types.ObjectId(req.query.assignmentId)}).exec();

  var saq = mongoose.model("studentassignmentquestions", StudentAssignmentQuestion.schema);
  saq.deleteMany({ assignmentId: req.query.assignmentId}).exec();

  var question = mongoose.model("questions", Question.schema);
  question.deleteMany({ assignmentID: req.query.assignmentId}).exec();

  var assignments = mongoose.model("assignments", Assignment.schema);
  let promise = assignments.deleteOne({ _id: mongoose.Types.ObjectId(req.query.assignmentId)}).exec();
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

router.get('/getAllStudents', function (req, res, next) {
  console.log("Getting all student list");
  console.log(req.query.userGrade);

  let promise = User.find({grade: req.query.userGrade, role: "student"}).exec();
  promise.then(function (doc) {
    console.log(doc);
    return res.status(200).json(doc);
  });
  promise.catch(function (err) {
    return res.status(err.status).json({
      message: err.message +
        ' Error in getting list of student.'
    });
  })
})

router.post('/addStudentAssignment', function (req, res, next) {
  console.log("Storing assignment for student into database", req.query.email);
  var studentassignments = mongoose.model("studentassignments", StudentAssignment.schema);
  var assignmentToStore = new studentassignments({
    studentId : req.query.email,
    assignmentId : mongoose.Types.ObjectId(req.query.assignmentId),
    gradeReceived: ""
  });

  assignmentToStore.save((err, doc) => {
    return res.status(201).json(doc);
  });
})

router.post('/upgradegrades', function (req, res, next) {
  console.log("hello in server");
  console.log("updating grade after teacher updates"+ req.body.Element._id.studentEmail+" -- "+ req.body.AssignmentId+"--->>"+req.body.Element.assignedGrade);
  var studentassignments = mongoose.model("studentassignments", StudentAssignment.schema);
  let promise = studentassignments.updateOne({studentId: req.body.Element._id.studentEmail, assignmentId: req.body.AssignmentId}, {$set:{ gradeReceived: req.body.Element.assignedGrade}}).exec();
    promise.then(function(doc) {
      if(doc) {
        return res.status(200).json(doc);
      }
    })
}) 

module.exports = router;