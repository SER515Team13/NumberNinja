/**
 * @project NumberNinja
 * @authors Sukhpreet Singh Anand, Sagar Khar
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var schema = new Schema({
    email : {type:String, require:true},
    username: {type:String, require:true},
    password: {type:String, require:true},
    firstname: {type:String, require:true},
    lastname: {type:String, require:true},
    role: {type:String, require:true},
    grade: {type:String, require:false},
    creation_dt: {type:Date, require:true}
});

schema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

schema.methods.isValid = function(hashedpassword){
    return  bcrypt.compareSync(hashedpassword, this.password);
}

module.exports = mongoose.model('User',schema);