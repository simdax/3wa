(function () {

var webshot = require('webshot');

var renderUrl = function (path,html,css) {
	var options = {
		defaultWhiteBackground:true,
  };
  if(css){
  	options.customCSS=css.toString();
  };
  if(html){
    options.siteType='html';
  }
  if(html){
		var renderStream = webshot(html.toString(), path ,options,function(err){
			if(err){console.log("error while taking photo':"+err)}
			else{
				console.log("rendered in"+path);
			}
		})
	}else{
			console.log(path);
			var renderStream = webshot(path, path+'prev.png' ,options,function(err){
			if(err){console.log("error while taking photo':"+err)}
			else{
				console.log("rendered in"+path);
			}
		})
	}
}

// stream mode .... ???

// var file = fs.createWriteStream('google.png', {encoding: 'binary'});

// renderStream.on('data', function(data) {
//   file.write(data.toString('binary'), 'binary');
// });

module.exports = renderUrl;
		
}())
