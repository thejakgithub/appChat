var express = require('express');
var router = express.Router();
var UserDB = require('../model/userDB');

router.get('/',function(req,res){
	res.render('index');
});

router.post('/chatroom',function(req,res){

	res.render('index');
});

router.post('/logout',function(req,res){
	res.redirect('/');
});



	


module.exports = router;