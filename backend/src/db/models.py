from sqlalchemy import Column, Integer, Float, String

from .base import Base

class Stock(Base):
    __tablename__ = "stocks"

    id = Column(Integer, primary_key=True, index=True)
    ticker = Column(String(5), unique=True, index=True)
    name = Column(String, nullable=False)
    price = Column(Float)
    dividend_yield = Column(Float)
    dividend_growth_1y = Column(Float)
    dividend_growth_5y = Column(Float)
