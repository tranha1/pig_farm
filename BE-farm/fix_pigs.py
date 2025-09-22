from database import get_db
from models import ProductPig, LuPigType
import random

db = next(get_db())
pig_types = db.query(LuPigType).all()
pigs = db.query(ProductPig).filter(ProductPig.pig_type_id.is_(None)).all()

print(f'Found {len(pigs)} pigs with null pig_type_id')

for pig in pigs:
    pig.pig_type_id = random.choice(pig_types).id

db.commit()
print('Updated pigs with valid pig_type_id')