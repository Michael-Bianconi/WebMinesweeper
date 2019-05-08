from src.com.webminesweeper.model.Board import Board
from src.com.webminesweeper.appl.BoardController import BoardController
from flask import Flask, render_template, request, json
app = Flask(__name__)
board = Board(5,5)

@app.route('/game')
def game():
    print(board)
    return render_template('game.html', board=board.__str__())


@app.route('/onTileClick', methods=['GET', 'POST'])
def onTileClick():
    print("Clicked")
    if request.method == "POST":
        controller = BoardController(board)
        position = request.json['position']
        coords = position.split(',')
        controller.uncover(int(coords[0]), int(coords[1]))
    return json.dumps({'board': board.__str__()})
