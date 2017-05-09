table =null;

	var arr = catArrays(array);
	var m = mean(arr);
	for (var i = 0; i < array.length ; i++) {
		html += "<tr>";
		for (var j = 0; j < array.length ; j++) {
			if (array[i][j]==0) {
				html += "<td style='background-color: black'>"+array[i][j]+"</td>";
			} else{
				var br = brightness(m[array.length*i+j]);
				if ((i%2!=0 && j%2!=0)||(i%2==0 && j%2==0)) {
						html += "<td onclick='add()' style='background-color: rgba("+br[2]+","+br[1]+","+br[0]*10+",1)'>"+array[i][j]+"</td>";
				}else{				
					html += "<td onclick='add()' style='background-color: rgba("+br[0]+","+br[1]+","+br[2]+",1)'>"+array[i][j]+"</td>";
				}
			}

		}	
		html += "</tr>";
	}
	return html
}