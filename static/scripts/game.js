/**
 * Called when a tile is clicked. Sends the coordinates
 * to the /onTileClick route as a string tuple of "row,col"
 */
function onTileClick() {

    var position = $(this).attr("name");
    $.ajax({

        url: "/onTileClick",
        type: "POST",
        data: JSON.stringify({"position": position}),
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        success: function(result) {

            console.log("Success with result=" + JSON.stringify(result));
            var oldBoard = document.getElementById("boardTable");
            oldBoard.parentNode.removeChild(oldBoard);
            boardCreate(result['board']);
        }
    });
}


/** Builds the table of tiles from the Board element. */
function boardCreate(tiles) {
    if (tiles == null) {return}
    var body = document.getElementsByTagName('body')[0];
    var tbl = document.createElement('table');
    tbl.id = "boardTable";
    var tbdy = document.createElement('tbody');

    var trow = document.createElement('tr');
    var row = 0;
    var col = 0;
    for (s in tiles) {
        if (tiles[s] == ' ') {
            tbdy.appendChild(trow);
            trow = document.createElement('tr');
            row++;
            col = 0;
        }

        else {
            var td = document.createElement('td');
            var tile = buildTileButton(row, col, tiles[s]);
            td.appendChild(tile);
            trow.appendChild(td);
            col++;
        }
    }

  tbl.appendChild(tbdy);
  body.appendChild(tbl)
}

function buildTileButton(row, col, char) {
    var tile = document.createElement('BUTTON')
    tile.name = row.toString() + ',' + col.toString();
    tile.onclick = onTileClick;
    tile.innerText = char;
    tile.classList.add("tile");
    charToClass(tile);
    return tile;
}

function charToClass(tile) {

    switch(tile.innerText) {

        case 'C':
            tile.style.color = "transparent";
            tile.style.backgroundColor = "#BBBBBB";
            return;
        case 'B':
            tile.style.color = "transparent";
            tile.style.backgroundColor = "black";
            return;
        case 'F':
            tile.style.color = "transparent";
            tile.style.backGroundColor = "red";
            return;
        case '0': return "uncovered0";
        case '1': return "uncovered1";
        case '2': return "uncovered2";
        case '3': return "uncovered3";
        case '4': return "uncovered4";
        case '5': return "uncovered5";
        case '6': return "uncovered6";
        case '7': return "uncovered7";
        case '8': return "uncovered8";
        default: return "button";
    }
}