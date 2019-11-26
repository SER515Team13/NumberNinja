/**
 * @project NumberNinja
 * @authors Sukhpreet Singh Anand, Saksham Jhawar
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    id : {type:String, require:true},
    name: {type:String, require:true},
    description: {type:String, require:true},
    duedate: {type:String, require:true},
    grade: {type:String, require:false},
    role: {type : String, require: true},
    createdby: {type : String, require: true}
});

module.exports = mongoose.model('Assignment',schema);