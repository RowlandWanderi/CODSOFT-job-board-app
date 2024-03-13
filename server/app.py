from models import db, User,Job,JobApplication
from flask import Flask
from flask_migrate import Migrate


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite"
db.init_app(app)
migrate = Migrate(app, db)

if __name__ == '__main__':
    app.run(port=5000, debug=True)