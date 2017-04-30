var express = require('express');
var router = express.Router();

var fs = require('fs');

var pres =	function(req, res, next) {
	fs.readdir('uploads', function (err,files) {
		var f = [];
		files.forEach((v,i)=>{
			if(fs.lstatSync('uploads/'+v).isDirectory()){
				f.push(v);
			} 
		});
		res.render('users', {users:f})
	})
};

router.get('/', pres);
module.exports = router;
