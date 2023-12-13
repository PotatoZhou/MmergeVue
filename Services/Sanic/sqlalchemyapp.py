from sqlalchemy import Table, MetaData, create_engine, Column, Integer, String, select
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import mapper, sessionmaker
from sanic import Request, Sanic, json, response
from sanic_cors import CORS
import pymysql
import uuid # not used right now
import random


mysqlUsername = "root"
mysqlPassword = "12345678"
databaseName = "mahjongdb"
engine = create_engine(f"mysql+pymysql://{mysqlUsername}:{mysqlPassword}@localhost/{databaseName}")
metadata = MetaData(bind=engine)
Base = declarative_base(metadata=metadata)
Userdb = Table("users", metadata, autoload_with=engine)


class User:
    __tablename__ = "users"
    user_id = Column(Integer, primary_key=True)
    username = Column(String(10), nullable=False)
    password = Column(String(50), nullable=False)

    def __init__(self, user_id, username, password):
        self.user_id = user_id
        self.username = username
        self.password = password

    def __repr__(self):
        return f"User(id: {self.user_id}, un: {self.username}, pw: {self.password})"


mapper(User, Userdb)
Session = sessionmaker(bind=engine)
session = Session()


app = Sanic("Mahjong")
CORS(app)


@app.route("/login", methods=['POST'])
async def login(request):
    print(request.form.get("username"))
    username = request.form.get("username")
    password = request.form.get("password")
    if username is None or password is None:
        return response.json({"message": "Username or password not provided"}, status=400)

    statement = select(User).filter_by(username=username)
    user = session.execute(statement).fetchone()
    if user is None:
        new_user_id = len(session.execute(select(User)).fetchall()) + 1
        session.add(User(username=username, password=password, user_id=new_user_id))
        session.commit()
        session.close()
        response.json({"message": "Login successful"})
    elif user[0].password != password:
        session.close()
        return response.json({"message": "Wrong password"}, status=400)
    return response.json({"message": "Login successful"})

if __name__ == "__main__":
    app.run(host="localhost", port=8000)
