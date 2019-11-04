var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    studentId : {type:String, require:true},
    assignmentId : {type:String, require:true},
    gradeReceived: {type:String, require:false, default: ""},
    isSolved: {type:Boolean, require:false, default: false}
});

module.exports = mongoose.model('student-assignment',schema);