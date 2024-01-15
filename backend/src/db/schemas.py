from typing import Optional
from pydantic import BaseModel

class StockBase(BaseModel):
    ticker: str
    name: str
    price: Optional[float] = None
    dividend_yield: Optional[float] = None
    dividend_growth_1y: Optional[float] = None
    dividend_growth_5y: Optional[float] = None

class StockCreate(StockBase):
    pass

class Stock(StockBase):
    id: int

    class Config:
        orm_mode = True
