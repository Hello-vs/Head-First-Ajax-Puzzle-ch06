window.onload = initPage;

function initPage()
{
    var tiles = document.getElementById("puzzleGrid").getElementsByTagName("td");
    for (var i = 0; i < tiles.length; i++){
        tiles[i].onclick = tileClick;
    }                      
}

var tileClick = function(){
    validClick(this);
}

function swap(selectedCell, targetCell){
    var exchangeImageFrom = selectedCell.firstElementChild;
    var exchangeImageTo = targetCell.firstElementChild;
    targetCell.append(exchangeImageFrom);
    selectedCell.append(exchangeImageTo);
}

function validClick(selectedCell){  
    let emptycellLookup = createDictionary("alt");
    let emptyCell = emptycellLookup["empty"];
    let isValid = validCells(selectedCell.id, emptyCell)
    if (isValid) {
        targetCell = document.getElementById(emptyCell);
        swap(selectedCell, targetCell);
        let playSeqLookup = createDictionary("id");
        if(checkWin(playSeqLookup)){ 
            document.getElementById("puzzleGrid").getElementsByClassName = "win";
            alert("Congrats You won the game!!")
        }
    }
    else{
        //output error messages;'
        alert("Invalid cell click!  Must click horizontal and vertical cells next to empty cell")
    }
}    

function validCells(selectedCell, emptyCell){
    let validCellLookup = allowedCellClicks(emptyCell);
    let cell = validCellLookup[selectedCell];
    if (typeof cell != "undefined")
        return true;
    else
        return false;
}

function allowedCellClicks(emptyCell){ 
    let rowCol = parseInt(emptyCell.split("cell")[1]);
    let rcT = rowCol - 10;
    let rcB = rowCol + 10;
    let rcL = rowCol - 01;
    let rcR = rowCol + 01;
    let dict = {};
    dict["cell" + rcT] = "cell" + rcT;
    dict["cell" + rcB] = "cell" + rcB;
    dict["cell" + rcL] = "cell" + rcL;
    dict["cell" + rcR] = "cell" + rcR;
    return dict;
}

function createDictionary(keyOrder){
    let tdlist = document.getElementById("puzzleGrid").getElementsByTagName("td");
    let imglist = document.getElementById("puzzleGrid").getElementsByTagName("img");
    let dict = {};
    for(var i = 0; i < tdlist.length; i++){
        if (keyOrder === "alt") 
             dict[imglist[i].alt] = tdlist[i].id;
        else
            dict[tdlist[i].id] = imglist[i].alt;
    }

    // Object.entries is used just to print out all the entries to console
    for (const [key, value] of Object.entries(dict))
    {
        if (keyOrder === "alt")
            console.log(key, value);
    }

    return dict;
}

function checkWin(dict){
    let tdList = document.getElementById("puzzleGrid").getElementsByTagName("td");
    for (var i = 0; i < tdList.length; i++){
        var n = i + 1;
        if (i === tdList.length)
            n = tdList.length - 1;
        console.log(dict[tdList[i].id]); 
        if (dict[tdList[i].id] != n)
                return false;
    }

    return true;
}

