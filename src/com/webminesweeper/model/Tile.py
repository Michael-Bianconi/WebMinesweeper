class Tile(object):
    """
    Tiles exist on the Board, and contain either bomb or
    a digit. The tile's digit corresponds to the number of
    bombs immediately around it.
    """

    __slots__ = {"row", "col", "bomb", "flagged", "covered", "digit"}

    def __init__(self,
                 row: int,
                 col: int,
                 bomb: bool = False,
                 flagged: bool = False,
                 covered: bool = True,
                 digit: int = None):
        self.row = row
        self.col = col
        self.bomb = bomb
        self.flagged = flagged
        self.covered = covered
        self.digit = digit

    def __str__(self):
        if self.covered and self.flagged:
            return 'F'
        elif self.covered:
            return 'C'
        elif self.bomb:
            return '*'
        elif self.digit is None:
            return '0'
        else:
            return self.digit.__str__()

    def __repr__(self):
        if self.bomb:
            return '*'

        else:
            return self.digit.__str__()
