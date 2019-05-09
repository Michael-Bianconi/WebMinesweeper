/******************************************************************************
 * Global attributes                                                          *
 *****************************************************************************/

const BOARD_WIDTH_PX = "400px";
const BOARD_HEIGHT_PX = "400px";
const CLICK_UNCOVER = "uncover";
const CLICK_FLAG = "flag";
const FLAG_IMG = "url(static/images/flag.png) no-repeat";
const BOMB_IMG = "url(static/images/bomb.png) no-repeat";
const FLAG_BUTTON_ACTIVE_COLOR = "#BBBBBB";
const FLAG_BUTTON_INACTIVE_COLOR = "#EEEEEE";

var clickType = CLICK_UNCOVER;

function onFlagButtonClick() {

    var flagButton = document.getElementById("flagButton");

    if (clickType === CLICK_UNCOVER) {
        clickType = CLICK_FLAG;
        flagButton.style.backgroundColor = FLAG_BUTTON_ACTIVE_COLOR;
    }

    else {
        clickType = CLICK_UNCOVER;
        flagButton.style.backgroundColor = FLAG_BUTTON_INACTIVE_COLOR;
    }
}

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
        data: JSON.stringify({"position": position, "action":clickType}),
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        // The route should return the string of tiles
        // On success, rebuild the board
        success: function(result) {
            var oldBoard = document.getElementById("boardTable");
            oldBoard.parentNode.removeChild(oldBoard);
            boardCreate(result['board']);
            if (result['state'] === "BoardState.WON") {
                alert("Won!");
            }
            else if (result['state'] === "BoardState.LOST") {
                alert("Lost!");
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

function buildFlagButton() {
    var div = document.getElementById("flagDiv");
    var button = document.createElement("button");
    button.id = "flagButton";
    button.name = "flagButton";
    button.onclick = onFlagButtonClick;
    button.style.background = FLAG_IMG;
    button.style.backgroundPosition = "center";
    button.classList.add("flag-button");
    div.appendChild(button);
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
            tile.style.background = BOMB_IMG;
            tile.style.backgroundPosition = "center";
            return;
        case 'F':
            tile.style.background = FLAG_IMG;
            tile.style.backgroundPosition = "center";
            tile.style.backgroundColor = "#BBBBBB";
            tile.style.color = "transparent";
            tile.removeAttribute("disabled");
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