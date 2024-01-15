from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy_utils import create_database, database_exists


SQLALCHEMY_DATABASE_URL = "postgresql://postgres:asdqwe1@localhost:5432/db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)

if not database_exists(engine.url):
    create_database(engine.url)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = None
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        