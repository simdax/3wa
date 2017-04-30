module.exports = function(app) {

  var fs = require('fs');
  var takePhoto = require('../uploads/webshot.js');

  function writeFiles(files,path,cb) {
    var opts={
      html:"index.html",
      css:"style.css",
      js:"main.js"
    };
    for (k in opts) {
      if(files[k]){  
        console.log("processing"+k);
        var p = path+"/"+opts[k];
        fs.writeFile(p, files[k].data, function (err) {
          if(err){console.log("error :" + err);}
        });
      }
    };
    cb =  function(){res.redirect("/users")};
    takePhoto(path+'prev.png',files.html.data,files.css.data,cb);
  }


  app.post("/newFile", function(req, res){
    var name;
    if ( req.session.user) 
    {name = req.session.user.displayName; }
    {name ="stranger";}
    var folderName = "uploads/"+ name;
  // crade mais efficace :)
  fs.existsSync(folderName) || fs.mkdirSync(folderName);
  writeFiles(req.files, folderName, res);
})


}