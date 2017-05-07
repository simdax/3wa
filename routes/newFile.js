module.exports = function(app) {

  var fs = require('fs');
  var takePhoto = require('./webshot.js');

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
    console.log("taking picture");
    var html,css;
    if(files.html) {html=files.html.data} else {html=""};
    if(files.css) {css=files.css.data} else {css=""};
    takePhoto(path+'prev.png',html,css,cb);
  }

  app.post("/newFile", function(req, res){
    var name = req.session.name; 
    var folderName = "uploads/"+ name;
    fs.existsSync(folderName) || fs.mkdirSync(folderName);
    writeFiles(req.files, folderName, res);
    res.redirect("/users");
})


}