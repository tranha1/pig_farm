from sqlalchemy.orm import Session
from database import SessionLocal
from models import (
    LuUnit, LuDoseUnit, LuMedicineCategory, LuPigType, LuContentKind,
    ProductPig, ProductMedicine, CmsContentEntry
)
from faker import Faker
import random
from datetime import datetime, timezone

fake = Faker()

def seed_lookup_tables(db: Session):
    # Seed lu_unit
    units = [
        {"code": "con", "label": "Con"},
        {"code": "hop", "label": "Hộp"},
        {"code": "chai", "label": "Chai"},
        {"code": "kg", "label": "Kg"},
    ]
    for unit in units:
        if not db.query(LuUnit).filter(LuUnit.code == unit["code"]).first():
            db_unit = LuUnit(**unit)
            db.add(db_unit)

    # Seed lu_dose_unit
    dose_units = [
        {"code": "ml", "label": "ml"},
        {"code": "vien", "label": "Viên"},
        {"code": "g", "label": "g"},
    ]
    for dose_unit in dose_units:
        if not db.query(LuDoseUnit).filter(LuDoseUnit.code == dose_unit["code"]).first():
            db_dose_unit = LuDoseUnit(**dose_unit)
            db.add(db_dose_unit)

    # Seed lu_medicine_category
    categories = [
        {"slug": "khang-sinh", "name": "Kháng sinh"},
        {"slug": "bo-tro", "name": "Bổ trợ"},
        {"slug": "nuoc", "name": "Nước"},
        {"slug": "bot", "name": "Bột"},
        {"slug": "sat-trung", "name": "Sát trùng"},
    ]
    for cat in categories:
        if not db.query(LuMedicineCategory).filter(LuMedicineCategory.slug == cat["slug"]).first():
            db_cat = LuMedicineCategory(**cat)
            db.add(db_cat)

    # Seed lu_pig_type
    pig_types = [
        {"code": "breeding", "label": "Lợn giống"},
        {"code": "sow", "label": "Lợn cái"},
    ]
    for pt in pig_types:
        if not db.query(LuPigType).filter(LuPigType.code == pt["code"]).first():
            db_pt = LuPigType(**pt)
            db.add(db_pt)

    # Seed lu_content_kind
    content_kinds = [
        {"code": "contact", "label": "Liên hệ"},
        {"code": "news", "label": "Tin tức"},
        {"code": "process", "label": "Quy trình"},
    ]
    for ck in content_kinds:
        if not db.query(LuContentKind).filter(LuContentKind.code == ck["code"]).first():
            db_ck = LuContentKind(**ck)
            db.add(db_ck)

    db.commit()

def seed_sample_data(db: Session):
    # Get existing lookup data
    units = db.query(LuUnit).all()
    dose_units = db.query(LuDoseUnit).all()
    categories = db.query(LuMedicineCategory).all()
    pig_types = db.query(LuPigType).all()
    content_kinds = db.query(LuContentKind).all()

    # Seed pigs
    for _ in range(10):
        pig = ProductPig(
            pig_type_id=random.choice(pig_types).id,
            name=fake.name(),
            unit_id=random.choice(units).id if units else None,
            price=round(random.uniform(1000000, 5000000), 2),
            note=fake.text(),
            is_featured=random.choice([True, False]),
            is_published=True,
            published_at=datetime.now(timezone.utc),
        )
        db.add(pig)

    # Seed medicines
    for _ in range(10):
        medicine = ProductMedicine(
            name=fake.company(),
            category_id=random.choice(categories).id if categories else None,
            ingredients=fake.text(),
            indications=fake.text(),
            packaging=fake.word(),
            unit_id=random.choice(units).id if units else None,
            price_unit=round(random.uniform(50000, 200000), 2),
            price_total=round(random.uniform(100000, 500000), 2),
            dose_unit_id=random.choice(dose_units).id if dose_units else None,
            price_per_dose=round(random.uniform(1000, 5000), 2),
            is_featured=random.choice([True, False]),
            is_published=True,
            published_at=datetime.now(timezone.utc),
        )
        db.add(medicine)

    # Seed CMS content
    for _ in range(5):
        cms = CmsContentEntry(
            kind_id=random.choice(content_kinds).id,
            slug=fake.slug(),
            title=fake.sentence(),
            summary=fake.text(),
            body_json={"content": fake.text()},
            body_html=f"<p>{fake.text()}</p>",
            author_name=fake.name(),
            is_published=True,
            published_at=datetime.now(timezone.utc),
        )
        db.add(cms)

    db.commit()

if __name__ == "__main__":
    db = SessionLocal()
    try:
        seed_lookup_tables(db)
        seed_sample_data(db)
        print("Sample data seeded successfully!")
    finally:
        db.close()