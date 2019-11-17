var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    studentId : {type:String, require:true},
    assignmentId : {type:String, require:true},
    gradeReceived: {type:String, require:false, default: ""},
});

module.exports = mongoose.model('studentassignment',schema);