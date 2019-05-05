from src.com.webminesweeper.model.Tile import Tile
import random


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

    def get(self, row: int, col: int):
        return self.tiles[row][col]

    def get_neighbors(self, tile: Tile):
        neighbors = []
        start_row = max(0, tile.row - 1)
        start_col = max(0, tile.col - 1)
        end_row = min(self.height - 1, tile.row + 1)
        end_col = min(self.width - 1, tile.col + 1)

        for row in range(start_row, end_row + 1):
            for col in range(start_col, end_col + 1):
                neighbors.append(self.get(row, col))

        return neighbors

    def update_digits(self):

        for row in range(self.height):
            for col in range(self.width):
                tile = self.get(row, col)
                tile.digit = 0
                neighbors = self.get_neighbors(tile)
                for n in neighbors:
                    if n.bomb:
                        tile.digit += 1

    def place_bombs(self, num_bombs: int):

        while num_bombs > 0:

            tile = None

            while tile is None:
                row = random.randint(0, self.height-1)
                col = random.randint(0, self.width-1)
                tile = self.get(row, col)
                if tile.bomb:
                    tile = None

            tile.bomb = True
            num_bombs -= 1

        self.update_digits()

    def __str__(self):
        string = ""
        for r in range(self.height):
            for c in range(self.width):
                string += self.tiles[r][c].__str__()
            string += '\n'
        return string

    def __repr__(self):
        string = ""
        for r in range(self.height):
            for c in range(self.width):
                string += self.tiles[r][c].__repr__()
            string += '\n'
        return string
