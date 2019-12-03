/**
 * @project NumberNinja
 * @authors Abhinaw Sarang, Sukhpreet Singh Anand
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    id : {type:String, require:false},
    formula : {type:String, require:true},
    formulaWithBlanks : {type:String, require:true},
    formulaType: {type:String, require:true},
    formulaForBlockly: {type:String, require:true},
    assignmentID: {type:String, require:true},
    answers:{type:Array}
});

module.exports = mongoose.model('Question',schema);