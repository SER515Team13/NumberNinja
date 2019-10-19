var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    id : {type:String, require:true},
    formula : {type:String, require:true},
    formulaType: {type:String, require:true}
});

module.exports = mongoose.model('Question',schema);