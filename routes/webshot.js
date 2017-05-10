(function () {

var webshot = require('webshot');
// var fs      = require('fs');

var renderUrl = function (path,html,css,cb) {
	var options = {
		defaultWhiteBackground:true,
    siteType:'html',
	  customCSS: css.toString(),
	};
	var renderStream = webshot(html.toString(), path ,options,function(err){
		if(err){console.log("error while taking photo':"+err)}
		else{
			console.log("rendered in"+path);
			// if(cb){cb()}
		}
	})
}

// stream mode .... ???

// var file = fs.createWriteStream('google.png', {encoding: 'binary'});

// renderStream.on('data', function(data) {
//   file.write(data.toString('binary'), 'binary');
// });

var renderUrl = function(){
	path.slice(0,-8)
}

module.exports = renderUrl;
		
}())
