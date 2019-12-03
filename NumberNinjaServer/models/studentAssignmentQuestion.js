/**
 * @project NumberNinja
 * @authors Abhinaw Sarang
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    studentEmail : {type:String, require:true},
    assignmentId : {type:String, require:true},
    questionId: {type:Schema.Types.ObjectId, require:true},
    isSolved: {type:Boolean, require:false, default: false},
    isCorrect: {type:Boolean, require:false, default: false},
    history: {type:String, require:false}
});

module.exports = mongoose.model('studentassignmentquestion', schema);