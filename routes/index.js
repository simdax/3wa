var express = require('express');
var router = express.Router();
var multer = require("multer");


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/upload', function (req,res) {
  res.render("upload");
})

// router.post("/newFile", function(req, res) {
//   console.log( "io");
//   res.send("ok");
// // console.log(req.file);
//   // var io = new formidable.incomingForm();
//   // console.log(io);
// })

module.exports = router;
