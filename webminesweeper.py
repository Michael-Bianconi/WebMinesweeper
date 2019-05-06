from src.com.webminesweeper.model.Board import Board
from flask import Flask, render_template
app = Flask(__name__)


@app.route('/game')
def game():

    board = Board(5, 5)
    board.place_bombs(4)
    return render_template('game.html', board=board)
