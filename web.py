from fastapi import FastAPI
from fastapi.templating import Jinja2Templates
from fastapi import Request

from fastapi.staticfiles import StaticFiles

templates = Jinja2Templates(directory="templates")

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

#fake_items_db = [{"item_name": "Foo"}, {"item_name": "Bar"}, {"item_name": "Baz"}]

@app.get("/")
async def goMain(request: Request):
    return templates.TemplateResponse("main.html",{"request":request})

@app.get("/support/")
async def goSupport(request: Request):
    return templates.TemplateResponse("support.html",{"request":request})

#@app.get("/items/")
#async def read_item(skip: int = 0, limit: int = 10):
#    return fake_items_db[skip : skip + limit]

#import pymysql

#conn = pymysql.connect(host="127.0.0.1", user="root", password="12345", 
#                        db='madang', charset="utf8", cursorclass=pymysql.cursors.DictCursor)
#cur = conn.cursor()

#@app.get("/userInfo/")
#def getUserInfoByName():
#  sql = "SELECT * FROM book where price > 10000"
#  cur.execute(sql)
#  row = cur.fetchall()
#  return row