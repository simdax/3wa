module.exports = function(app) {

	app.post("/newFile", function(req, res){

  console.log(req.files);

  if(req.files.html){  
    console.log("processing html");
    fs.writeFile("uploads/index.html", req.files.html.data, function (err) {
      console.log(err);
    });
  }
  if(req.files.css){  
        console.log("processing css");
    fs.writeFile("uploads/style.css", req.files.css.data, function (err) {
      console.log(err);
    });
  }
  if(req.files.js){  
        console.log("processing js");
    fs.writeFile("uploads/main.js", req.files.js.data, function (err) {
      console.log(err);
    });
  }
  res.redirect("/users");
})


}