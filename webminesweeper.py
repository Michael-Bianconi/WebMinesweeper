from src.com.webminesweeper.model.Board import Board, BoardState
from src.com.webminesweeper.appl.BoardController import BoardController
from src.com.webminesweeper.appl.User import User
from flask import Flask, render_template, request, json, redirect, url_for
from flask_login import LoginManager
app = Flask(__name__)
login_manager = LoginManager()
login_manager.init_app(app)
board = Board(15, 10)
controller = BoardController(board)
controller.place_bombs(25)


@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)


@app.route('/')
def game():
    return render_template('game.html', board=board.__str__())


@app.route('/won')
def won():
    return render_template('won.html')


@app.route('/lost')
def lost():
    return render_template('lost.html')


@app.route('/onTileClick', methods=['POST'])
def on_tile_click():

    position = request.json['position']
    click_type = request.json['action']
    coords = position.split(',')
    row = int(coords[0])
    col = int(coords[1])

    if click_type == "flag":
        tile = board.get(row, col)
        if tile.flagged:
            controller.unflag(row, col)
        else:
            controller.flag(row, col)

    else:
        controller.uncover_region(row, col)

    state = controller.board_state()
    return json.dumps({'board': board.__str__(), 'state': state.__str__()})