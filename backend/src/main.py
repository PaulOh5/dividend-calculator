from typing import Union
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session

from db import crud, schemas, models
from db.base import get_db, engine

models.Base.metadata.create_all(bind=engine)

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
