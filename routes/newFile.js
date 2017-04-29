module.exports = function(app) {

  var fs = require('fs');
  
  function writeFiles(files,path) {
    var opts={
      css:"style.css",
      html:"index.html",
      js:"main.js"
    };
    for (k in opts) {
      if(files[k]){  
        console.log("processing"+k);
        fs.writeFile(path+"/"+opts[k], files[k].data, function (err) {
          if(err){console.log(err);}
        });
      }      
    }
    // if(files.css){  
    //   console.log("processing css");
    //   fs.writeFile(path+"/style.css", files.css.data, function (err) {
    //     if(err){console.log(err);}
    //   });
    // }
    // if(files.js){  
    //   console.log("processing js");
    //   fs.writeFile(path+"/main.js", files.js.data, function (err) {
    //     if(err){console.log(err);}
    //   });
    // }
  }


  app.post("/newFile", function(req, res){

    console.log(req.files);
    console.log(req.session);
    var folderName = "uploads/" + req.session.user.displayName;
  // crade mais efficace :)
  fs.existsSync(folderName) || fs.mkdirSync(folderName);
  writeFiles(req.files, folderName);
  res.redirect("/users");
})


}