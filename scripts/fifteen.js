window.onload = initPage;

function initPage(){
	var table = document.getElementById("puzzleGrid");
	var tds = table.getElementsByTagName("td");
	for(var i=0; i<tds.length; i++){
		var cell = tds[i];
		cell.onclick = tileClick;
	}
}

var swapTiles = function(selectedCell, destinationCell){
	selectedImage = selectedCell.firstChild;
	while(selectedImage.nodeName === "#text"){
		selectedImage = selectedImage.nextSibling;
	}
	destinationImage = destinationCell.firstChild;
	while(destinationImage.nodeName === "#text"){
		destinationImage = destinationImage.nextSibling;
	}
	selectedCell.appendChild(destinationImage);
	destinationCell.appendChild(selectedImage);

	if(puzzleIsComplete()){
		document.getElementById("puzzleGrid").className = "win";
	}
}

var tileClick = function(){
	if(cellIsEmpty(this)){
		alert("please click a numbered title");
		return;
	}
	var currentRow = this.id.charAt(4);
	var currentCol = this.id.charAt(5);
	
	if(currentRow > 1){
		var testRow = Number(currentRow) - 1;
		var testCellId = "cell" + testRow + currentCol;
		var testCell = document.getElementById(testCellId);
		if(cellIsEmpty(testCell)){
			swapTiles(this,testCell);
			return;
		}
	}
	if(currentRow < 4){
		var testRow = Number(currentRow) + 1;
		var testCellId = "cell" + testRow + currentCol;
		var testCell = document.getElementById(testCellId);
		if(cellIsEmpty(testCell)){
			swapTiles(this, testCell);
			return;
		}
	}
	if(currentCol > 1){
		var testCol = Number(currentCol) - 1;
		var testCellId = "cell" + currentRow + testCol;
		var testCell = document.getElementById(testCellId);
		if(cellIsEmpty(testCell)){
			swapTiles(this, testCell);
			return;
		}
	}
	if(currentCol < 4){
		var testCol = Number(currentCol) + 1;
		var testCellId = "cell" + currentRow + testCol;
		var testCell = document.getElementById(testCellId);
		if(cellIsEmpty(testCell)){
			swapTiles(this, testCell);
			return;
		}
	}

	alert("please click a tile next to the empty cell");

}

var cellIsEmpty = function(cell){
	var image = cell.firstChild;
	while(image.nodeName === "#text"){
		image = image.nextSibling;
	}
	if(image.alt === "empty"){
		return true;
	}
	else{
		return false;
	}
}

var puzzleIsComplete = function(){
	var tiles = document.getElementById("puzzleGrid").getElementsByTagName("img");
	var tileOrder = "";
	for(var i=0; i<tiles.length; i++){
		var num = tiles[i].src.substr(-6,2);
		if(num !== "ty"){
			tileOrder += num;
		}
	}
	if(tileOrder === "010203040506070809101112131415"){
		return true;
	}
	return false;
}