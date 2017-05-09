
var router = require('express').Router();
var fs=require('fs');
var rimraf = require('rimraf');

router.get( "/", function(req,res) {
  res.render("upload")
});
router.post("/dir", function (req,res) {
  var tree={};
  req.body.io.split(",").forEach(function (v) {
    // make correspondance FILENAME => PATH
    tree[v.replace(/^.*[\\\/]/, '')] = "uploads/" + req.session.name + v.substring(v.indexOf("/"), v.lastIndexOf("/"))+"/";
  });
  var name="uploads/"+req.session.name;
  // on détruit tout ce qui existe
  if(fs.existsSync(name)){
    console.log("ca existe", name);
    rimraf(name, function (err) {
      console.log("nettoyer le folder");
      fs.mkdirSync(name);
      res.locals.tree=tree;
      res.redirect(307, '/newFile');
    });
  }
  else{
    fs.mkdirSync(name)
    res.locals.tree=tree;
    res.redirect(307, '/newFile');
  };
});

module.exports = router;