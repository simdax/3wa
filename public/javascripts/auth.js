// le formatage ne devrait pas se faire côté client
// mais peut-être, si on est chaud, on poutrera des
// anims de loading de ouf...

// $(function() {

// function formatName(name) {
// 		return name.replace(/\w/g, function(a,i){
// 			if(i==0){ return a.toUpperCase()}
// 			{
// 				return a.toLowerCase();
// 			}
// 		});
// }
// 	function postAjax(path) {
// 		$.post(path,function(data) {
// 			console.log(data);
// 		})
// 	}	
// 	function submit(e) {
// 		e.preventDefault();
// 		// first input is name
// 		var name = $(this).find('input').val();
// 		name = formatName(name);
// 		e.currentTarget.submit();
// 	}

// 	$('form').on('submit', submit);
// })