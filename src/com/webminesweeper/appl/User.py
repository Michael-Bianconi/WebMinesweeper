from flask_login import UserMixin


class User(UserMixin):
    """
    Represents Users.
    """

    def __str__(self):
        return self.get_id()