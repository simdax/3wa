var router = require('express').Router();

var fs = require('fs');

router.get('/', function (req,res,next) {
  var files = fs.readdir("views/consignes",function (err,files) {
    var f = [];
    for (var i = files.length - 1; i >= 0; i--) {
      var el = files[i];
      if(el != 'main.pug' && el != 'layout.pug'){
        f.push(el.slice(0,-4))
      };
    }
    res.render('consignes/main',{files:f});
  })
})

router.get('/:id', function (req,res,next) {
  res.render('consignes/'+req.params.id)
})

module.exports = router;