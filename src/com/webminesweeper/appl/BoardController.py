from src.com.webminesweeper.model.Board import Board
import random


class BoardController(object):
    """
    Provides functionality for manipulating the board.
    """

    __slots__ = {"board"}

    def __init__(self, board: Board):
        self.board = board

    def uncover(self, row: int, col: int):
        self.board.get(row, col).covered = False

    def flag(self, row: int, col: int):
        self.board.get(row, col).flagged = True

    def unflag(self, row: int, col: int):
        self.board.get(row, col).flagged = False

    def place_bombs(self, num_bombs: int):
        """
        Places N bombs around the board in random positions.
        There must be enough non-bomb tiles present on the
        board or there will be an infinite loop. Updates
        digits automatically.
        TODO: Fix infinite loop if num_bombs is too big

        :param num_bombs: Number of bombs to place.
        """

        while num_bombs > 0:

            tile = None

            while tile is None:
                row = random.randint(0, self.board.height-1)
                col = random.randint(0, self.board.width-1)
                tile = self.board.get(row, col)
                if tile.bomb:
                    tile = None

            tile.bomb = True
            num_bombs -= 1

        self.update_digits()

    def update_digits(self):
        """
        Checks each tile and updates its digit according to the
        number of bomb tiles surrounding it. Should always be called
        immediately after adding or removing a bomb. Does not need
        to be called at any other time.
        """

        for row in range(self.board.height):
            for col in range(self.board.width):
                tile = self.board.get(row, col)
                tile.digit = 0
                neighbors = self.board.get_neighbors(tile)
                for n in neighbors:
                    if n.bomb:
                        tile.digit += 1

    def uncover_region(self, row: int, col: int):
        self.uncover(row, col)
        tile = self.board.get(row, col)
        print("digit="+tile.digit.__str__())
        if tile.digit == 0:
            print("getting neighbors")
            neighbors = self.board.get_neighbors(tile)
            print(neighbors)
            for n in neighbors:
                if n.covered:
                    self.uncover_region(n.row, n.col)
