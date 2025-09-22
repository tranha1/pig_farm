from database import engine
from sqlalchemy import text

with engine.connect() as conn:
    conn.execute(text("DROP TABLE IF EXISTS product_medicine CASCADE;"))
    conn.commit()
    print("Dropped product_medicine table")