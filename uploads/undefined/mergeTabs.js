function merge(tab1,tab2,offset) {
	for (var i = 0; i < tab1.length - offset.x; i++) {
		for (var j = 0; j < tab1[i].length - offset.y ; j++) {
			console.log(tab1[i+offset.x][j+offset.y]);
			console.log(tab2[i][j]);
			tab1[i+offset.x][j+offset.y] -= tab2[i][j]
		}
	}
}

function add(){
	console.log('coucou');
}

// todo adapt 
function copyTab(tab) {
	var copy=[];
	for (var i = 0; i < tab.length; i++) {
		if (Array.isArray(tab[i])) {
			copy.push(copyTab(tab[i]));
		}else{
		copy.push(tab[i])
		}	
	}
	return copy;
}

function mergeAt(offset){
	var copy=copyTab(table);
	merge(table,copy,offset);
	generate(table);
}