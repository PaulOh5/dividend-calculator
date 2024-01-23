from sqlalchemy.orm import Session

from db import models, schemas

def create_stock(db: Session, stock: schemas.StockCreate):
    db_stock = models.Stock(**stock.model_dump())
    db.add(db_stock)
    db.commit()
    db.refresh(db_stock)

    return db_stock
    
def get_stock_list(db: Session):
    stocks = db.query(models.Stock).all()
    return stocks
    
def get_stock(db: Session, ticker: str):
    stock = db.query(models.Stock).filter(models.Stock.ticker == ticker).first()
    return stock
