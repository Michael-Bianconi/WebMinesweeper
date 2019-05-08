from src.com.webminesweeper.model.Board import Board, BoardState
from src.com.webminesweeper.appl.BoardController import BoardController
from flask import Flask, render_template, request, json, redirect, url_for
app = Flask(__name__)
board = Board(10, 20)
controller = BoardController(board)
controller.place_bombs(25)


@app.route('/game')
def game():
    return render_template('game.html', board=board.__str__())


@app.route('/won')
def won():
    return render_template('won.html')


@app.route('/lost')
def lost():
    return render_template('lost.html')


@app.route('/onTileClick', methods=['POST'])
def onTileClick():

    position = request.json['position']
    coords = position.split(',')
    controller.uncover_region(int(coords[0]), int(coords[1]))
    state = controller.board_state()

    return json.dumps({'board': board.__str__(), 'state': state.__str__()})
