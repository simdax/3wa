
function getCenter(length){
	var res=length-1;
	return {x:res,y:res};
}

function genTable(nb){
	var table = [];
	for (var i = 0; i < (nb*2-1) ; i++) {
		table.push([]);
		for (var j = nb*2-1; j > 0; j--) {
			table[i].push(0);
		}	
	};
	return table;
}

function fill(nb,table,begin=getCenter(nb),c=0){
	var cc=c+1;	
	if (cc>nb) {return};
	if (cc>1) {
		table[begin.x][begin.y] += 1;
	};
	fill(nb,table,{x:begin.x+1,y:begin.y},cc);
	fill(nb,table,{x:begin.x,y:begin.y+1},cc);
	fill(nb,table,{x:begin.x-1,y:begin.y},cc);
	fill(nb,table,{x:begin.x,y:begin.y-1},cc);
}

// function fill(nb,table,begin=getCenter(nb),c=0){
// 	var cc=c+1;	
// //	if (cc>nb) {return};
// 	if (cc>1 && cc>nb-1 ) {
// 		table[begin.x][begin.y] += 1;
// 		return
// 	};
// 	fill(nb,table,{x:begin.x+1,y:begin.y},cc);
// 	fill(nb,table,{x:begin.x,y:begin.y+1},cc);
// 	fill(nb,table,{x:begin.x-1,y:begin.y},cc);
// 	fill(nb,table,{x:begin.x,y:begin.y-1},cc);
// }

