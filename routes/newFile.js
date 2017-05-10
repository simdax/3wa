module.exports = function(app) {

  var fs = require('fs');
  var takePhoto = require('./webshot.js');
  var mkdirp = require('mkdirp');

  function writeFiles(files,path,tree) {
    if(tree){ 
      files.dir.forEach(function (file) {
        var p=tree[file.name];
        mkdirp.sync(p);
        fs.writeFile(p+file.name, file.data, function (err) {
          if(err){console.log("error :" + err);}
          console.log("taking picture");
          takePhoto(path);
        });
      });
    }
    else{      
      for (k in files) {
        if(files[k]){  
          console.log("processing"+k);
          var p = path+"/"+files[k].name;
          fs.writeFile(p, files[k].data, function (err) {
            if(err){console.log("error :" + err);}
            console.log("taking picture");
            var html,css;
            if(files.html) {html=files.html.data} else {html=""};
            if(files.css) {css=files.css.data} else {css=""};
            takePhoto(path+'prev.png',html,css,cb);
          });
        }
      };
    }
  }

  app.post("/newFile", function(req, res){
    var name = req.session.name; 
    var folderName = "uploads/"+ name;
    fs.existsSync(folderName) || fs.mkdirSync(folderName);
    writeFiles(req.files, folderName, res.locals.tree);
    res.redirect("/users");
})


}