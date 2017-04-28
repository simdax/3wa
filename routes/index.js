var express = require('express');
var router = express.Router();
var multer = require("multer");


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/upload', function (req,res) {
  res.render("upload", {success:null, name:"stranger"});
})

module.exports = router;
