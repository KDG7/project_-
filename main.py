import os
from fastapi import FastAPI
from fastapi.templating import Jinja2Templates
from fastapi import Request
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from typing import Optional
import random
import data

from fastapi.staticfiles import StaticFiles
templates = Jinja2Templates(directory="templates")

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

#uvicorn main:app --reload --port 8000 로 열기
@app.get("/marlearn")
async def goMain(request: Request):
    return templates.TemplateResponse("mainH.html", {"request": request})

@app.get("/config")
def read_config():
    api_key = os.getenv("fast-api", "fast-api-value")
    return {
        "API_KEY": api_key
    }

class BetRequest(BaseModel):
    betType: int
    horseNumber1: int
    horseNumber2: Optional[int] = None
    horseNumber3: Optional[int] = None
    betAmount: int

def calculate_winnings(betType, betAmount, horses, request):
    if betType == 1:
        if request.horseNumber1 == horses[0]:
            return betAmount * 7.3
    elif betType == 2:
        if request.horseNumber1 in horses[:3]:  # 연승 베팅 시 말이 3등 안에 들어오면 배팅에 성공
            return betAmount * 2.6
    elif betType == 3:
        if (request.horseNumber1 == horses[0] and request.horseNumber2 == horses[1]) or (request.horseNumber1 == horses[1] and request.horseNumber2 == horses[0]):
            return betAmount * 31.7
    elif betType == 4:
        if request.horseNumber1 == horses[0] and request.horseNumber2 == horses[1]:
            return betAmount * 82
    elif betType == 5:
        if len(set([request.horseNumber1, request.horseNumber2]) & set(horses[:3])) == 2:
            return betAmount * 11.7
    elif betType == 6:
        if set([request.horseNumber1, request.horseNumber2, request.horseNumber3]) == set(horses[:3]):
            return betAmount * 123.3
    elif betType == 7:
        if [request.horseNumber1, request.horseNumber2, request.horseNumber3] == horses[:3]:
            return betAmount * 821.3
    return 0

@app.post("/place_bet")
async def place_bet(request: BetRequest):
    horses = list(range(1, 8))
    random.shuffle(horses)

    winningAmount = calculate_winnings(request.betType, request.betAmount, horses, request)
    finalPositions = {horse: position + 1 for position, horse in enumerate(horses)}
    sorted_final_positions = sorted(finalPositions.items(), key=lambda x: x[1])

    return {
        "finalPositions": sorted_final_positions,
        "winningAmount": winningAmount,
        "winner": horses[0]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


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