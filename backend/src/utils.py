import os
import math
import pandas as pd
from .services import crud

from db.base import get_db, engine
from db import models, schemas

models.Base.metadata.create_all(bind=engine)

def load_data():
    script_path = os.path.dirname(os.path.realpath(__file__))
    parent_path = os.path.dirname(script_path)

    aristocrats_path = os.path.join(parent_path, 'raw_data', 'dividend_aristocrats.xlsx')
    kings_path = os.path.join(parent_path, 'raw_data', 'dividend_kings.xlsx')

    aristocrats = pd.read_excel(aristocrats_path)
    kings = pd.read_excel(kings_path)

    df = pd.concat([aristocrats, kings])
    df = df.drop_duplicates(subset=['Ticker'])

    df = df[['Ticker', 'Name', 'Price', 'Dividend Yield', '1-Year Dividend Growth', '5-Year Dividend Growth (Annualized)']]
    df.rename(columns={
        'Ticker': 'ticker',
        'Name': 'name',
        'Price': 'price',
        'Dividend Yield': 'dividend_yield',
        '1-Year Dividend Growth': 'dividend_growth_1y',
        '5-Year Dividend Growth (Annualized)': 'dividend_growth_5y'
    }, inplace=True)
    df['price'] = df['price'].round(3)
    df['dividend_yield'] = df['dividend_yield'].round(3)
    df['dividend_growth_1y'] = df['dividend_growth_1y'].round(3)
    df['dividend_growth_5y'] = df['dividend_growth_5y'].round(3)
    list_of_dicts = df.to_dict(orient='records')
    list_of_dicts = [{k: v for k, v in d.items() if not (type(v) == float and math.isnan(v))} for d in list_of_dicts]
    
    db = next(get_db())
    for stock in list_of_dicts:
        db_stock = schemas.StockCreate(**stock)
        crud.create_stock(db, db_stock)

load_data()
