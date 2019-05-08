from src.com.webminesweeper.model.Board import Board
from src.com.webminesweeper.appl.BoardController import BoardController
from flask import Flask, render_template, request, json
app = Flask(__name__)
board = Board(10, 20)
controller = BoardController(board)
controller.place_bombs(5)

@app.route('/game')
def game():
    return render_template('game.html', board=board.__str__())


@app.route('/onTileClick', methods=['GET', 'POST'])
def onTileClick():
    if request.method == "POST":
        position = request.json['position']
        coords = position.split(',')
        controller.uncover_region(int(coords[0]), int(coords[1]))
    return json.dumps({'board': board.__str__()})
