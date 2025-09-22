from database import engine
from sqlalchemy import text

with engine.connect() as conn:
    result = conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_name = 'product_medicine' ORDER BY ordinal_position;")).fetchall()
    print([row[0] for row in result])