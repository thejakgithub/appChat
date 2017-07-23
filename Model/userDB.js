var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	name: {type:String,unique:true},
	username: {type:String,unique:true,index:true},
	password: {type:String}

});

var User = mongoose.model('User', userSchema);
module.exports = User;