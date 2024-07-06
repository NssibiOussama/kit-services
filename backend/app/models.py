from . import mongo

class User:
    def __init__(self, username, password,email):
        self.username = username
        self.password = password
        self.email = email

    def save(self):
        mongo.db.users.insert_one({'username': self.username, 'password': self.password, 'email': self.email})



