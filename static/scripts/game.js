/******************************************************************************
 * Global attributes                                                          *
 *****************************************************************************/

var BOARD_WIDTH_PX = "400px";
var BOARD_HEIGHT_PX = "400px";

/**
 * Called when a tile is clicked. Sends the coordinates
 * to the /onTileClick route as a string tuple of "row,col"
 * This will update the board.
 */
function onTileClick() {

    var position = $(this).attr("name");
    $.ajax({

        url: "/onTileClick",
        type: "POST",
        data: JSON.stringify({"position": position}),
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        // The route should return the string of tiles
        // On success, rebuild the board
        success: function(result) {
            console.log(JSON.stringify(result));
            if (result['state'] === "BoardState.WON") {
                window.location = "/won";
            }
            else if (result['state'] === "BoardState.LOST") {
                window.location = "/lost";
            }
            else {
                var oldBoard = document.getElementById("boardTable");
                oldBoard.parentNode.removeChild(oldBoard);
                boardCreate(result['board']);
            }
        }
    });
}


/**
 * Builds the table of tiles from the Board element.
 *
 * TODO: Clean this up. Maybe jsonify the board?
 */
function boardCreate(tiles) {
    if (tiles == null) {return}

    var boardWidth = 0;
    var boardHeight = 0;

    var div = document.getElementById('boardDiv');
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
            boardHeight++;
            col = 0;
            boardWidth = 0;
        }

        else {
            var td = document.createElement('td');
            var tile = buildTileButton(row, col, tiles[s]);
            td.appendChild(tile);
            trow.appendChild(td);
            boardWidth++;
            col++;
        }
    }
    tbdy.appendChild(trow);
    boardHeight++;

    var root = document.documentElement;
    root.style.setProperty("--board-col-count", boardWidth);
    root.style.setProperty("--board-row-count", boardHeight);

    tbl.appendChild(tbdy);
    div.appendChild(tbl)
}

function buildTileButton(row, col, char) {
    var tile = document.createElement('BUTTON')
    tile.name = row.toString() + ',' + col.toString();
    tile.onclick = onTileClick;
    tile.innerText = char;
    tile.setAttribute("disabled","disabled");
    tile.classList.add("tile");
    charToClass(tile);
    return tile;
}

function charToClass(tile) {

    switch(tile.innerText) {

        case 'C':
            tile.style.color = "transparent";
            tile.style.backgroundColor = "#BBBBBB";
            tile.removeAttribute("disabled");
            return;
        case '*':
            tile.style.color = "transparent";
            tile.style.backgroundColor = "black";
            return;
        case 'F':
            tile.style.color = "transparent";
            tile.style.backgroundColor = "red";
            return;

        case '0':
            tile.style.color = "transparent";
            tile.style.backgroundColor = "white";
            return;

        case '1':
            tile.style.color = "blue";
            tile.style.backgroundColor = "white";
            return;

        case '2':
            tile.style.color = "green";
            tile.style.backgroundColor = "white";
            return;

        case '3':
            tile.style.color = "red";
            tile.style.backgroundColor = "white";
            return;

        case '4':
            tile.style.color = "#2e86c1";
            tile.style.backgroundColor = "white";
            return;

        case '5':
            tile.style.color = "#943126";
            tile.style.backgroundColor = "white";
            return;

        case '6':
            tile.style.color = "cyan";
            tile.style.backgroundColor = "white";
            return;

        case '7':
            tile.style.color = "black";
            tile.style.backgroundColor = "white";
            return;

        case '8':
            tile.style.color = "gray";
            tile.style.backgroundColor = "white";

        default: return;
    }
}