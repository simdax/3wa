var express = require('express');
var router = express.Router();


var fs = require('fs');

var pres =	function(req, res, next) {
	var paths = fs.readdir('uploads', function (err,files) {
		res.render('users', {users:files})
	})
};

router.get('/', pres);
module.exports = router;
