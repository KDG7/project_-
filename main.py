from fastapi import FastAPI
from fastapi.templating import Jinja2Templates
from fastapi import Request

from fastapi.staticfiles import StaticFiles

templates = Jinja2Templates(directory="templates") #백엔드 친구들은 알아야한다. 경로를 꼭 지정해줘야 된다.

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static") #백엔드 친구들은 알아야한다.
# 객체에 마운트 시킨다. 경로를 클라이언트에서 찾아야하는데 클라이언트에서 경로를 찾을 수 있게 설정해놓은것이다.
# /static을 쓰면 static이라는 폴더를 가리키는 것을 설정해놓은 것이다. 이걸 서버에서 설정(컨트롤)을 해놔야 경로 오류가 안남)
fake_items_db = [{"item_name": "Foo"}, {"item_name": "Bar"}, {"item_name": "Baz"}]

@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse("index.html",{"request":request})

@app.get("/search/")
async def home(request: Request):
    return templates.TemplateResponse("search.html",{"request":request})

@app.get("/search2/")
async def home(request: Request):
    return templates.TemplateResponse("search2.html",{"request":request})

@app.get("/items/")
async def read_item(skip: int = 0, limit: int = 10):
    return fake_items_db[skip : skip + limit]

import pymysql
# userInfo
conn = pymysql.connect(host="127.0.0.1", user="root", password="12345", 
                        db='madang', charset="utf8", cursorclass=pymysql.cursors.DictCursor)
cur = conn.cursor()

@app.get("/userInfo/")
def getUserInfoByName():
  sql = "SELECT * FROM book where price > 10000"
  cur.execute(sql)
  row = cur.fetchall()
  return row