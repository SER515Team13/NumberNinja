var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    _id : {type:String, require:true},
    studentEmail : {type:String, require:true},
    assignmentName : {type:String, require:true},
    questionId: {type:String, require:true},
    isSolved: {type:Boolean, require:false, default: false}
});

module.exports = mongoose.model('studentAssignmentQuestion', schema);