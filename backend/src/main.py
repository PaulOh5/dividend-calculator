import os
import sys

from services import crud
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import json

from db import schemas, models
from db.base import get_db, engine

models.Base.metadata.create_all(bind=engine)
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost', 'http://localhost:3000', 'http://localhost:8000'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

@app.get("/stocks")
async def get_stock(db: Session = Depends(get_db)):
    result = crud.get_stock_list(db)
    return {"stocks": result}


@app.get("/stocks/{ticker}")
async def get_stock(ticker: str, db: Session = Depends(get_db)):
    result = crud.get_stock(db, ticker)
    if result is None:
        raise HTTPException(status_code=404, detail="Stock not found")
    return {"stock": result}

# 1. Fast API Feil Structure 잡기
# 2. 투자 비율, 배당률, 연평균 배당 성장률을 입력받아서 1년 단위로 얼마의 배당금을 받을 수 있는지 계산
# 2번까지 수요일안에 구현

# 3. 세금 계산하는 로직 구현
# 4. 
