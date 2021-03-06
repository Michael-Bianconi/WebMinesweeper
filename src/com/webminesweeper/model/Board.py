from src.com.webminesweeper.model.Tile import Tile
from enum import Enum


class BoardState(Enum):
    IN_PROGRESS = 1,
    WON = 2,
    LOST = 3


class Board(object):

    __slots__ = {'tiles', 'width', 'height'}

    def __init__(self, width: int, height: int):
        self.width = width
        self.height = height
        self.tiles = []
        for r in range(height):
            row = []
            for c in range(width):
                row.append(Tile(r, c))
            self.tiles.append(row)

        for r in self.tiles:
            for c in r:
                c.neighbors = self._get_neighbors(c)

    def get(self, row: int, col: int):
        return self.tiles[row][col]

    def _get_neighbors(self, tile: Tile):
        """
        Gets all tiles surrounding the given tile.

        NOTE: Use the tile's 'neighbors' attribute whenever
        possible.

        :param tile: Tile to get the neighbors of.
        :return: List of tiles surrounding the tile.
        """
        neighbors = []
        start_row = max(0, tile.row - 1)
        start_col = max(0, tile.col - 1)
        end_row = min(self.height - 1, tile.row + 1)
        end_col = min(self.width - 1, tile.col + 1)

        for row in range(start_row, end_row + 1):
            for col in range(start_col, end_col + 1):
                neighbors.append(self.get(row, col))

        return neighbors


    def __str__(self):
        string = ""
        for r in range(self.height):
            for c in range(self.width):
                string += self.tiles[r][c].__str__()
            if r != self.height-1:
                string += ' '
        return string

    def __repr__(self):
        string = ""
        for r in range(self.height):
            for c in range(self.width):
                string += self.tiles[r][c].__repr__()
            if r != self.height-1:
                string += ' '
        return string
