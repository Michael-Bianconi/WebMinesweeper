from src.com.webminesweeper.model.Board import Board
from src.com.webminesweeper.model.Tile import Tile


def main():

    board = Board(5, 5)
    board.place_bombs(4)
    print(board.__repr__())


if __name__ == "__main__":
    main()