from sqlalchemy import Column, Integer, String, Text, Numeric, Boolean, BigInteger, DateTime, ForeignKey, JSON
from sqlalchemy.sql import func
from database import Base


class ProductPig(Base):
    __tablename__ = "product_pig"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    pig_type_id = Column(Integer, ForeignKey("lu_pig_type.id"), nullable=False)
    name = Column(Text, nullable=False)
    breed_line_id = Column(Integer, ForeignKey("lu_pig_breed_line.id"))
    unit_id = Column(Integer, ForeignKey("lu_unit.id"))
    price = Column(Numeric(14, 2))
    note = Column(Text)
    is_featured = Column(Boolean, default=False, nullable=False)
    cover_image_id = Column(BigInteger)
    slug = Column(String)
    published_at = Column(DateTime(timezone=True))
    is_published = Column(Boolean, default=False, nullable=False)
    is_deleted = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)


class ProductMedicine(Base):
    __tablename__ = "product_medicine"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    name = Column(Text, nullable=False)
    category_id = Column(Integer, ForeignKey("lu_medicine_category.id"))
    line_id = Column(Integer, ForeignKey("lu_medicine_line.id"))
    ingredients = Column(Text)
    indications = Column(Text)
    packaging = Column(Text)
    unit_id = Column(Integer, ForeignKey("lu_unit.id"))
    price_unit = Column(Numeric(14, 2))
    price_total = Column(Numeric(14, 2))
    dose_unit_id = Column(Integer, ForeignKey("lu_dose_unit.id"))
    price_per_dose = Column(Numeric(14, 2))
    support_price_per_dose = Column(Numeric(14, 2))
    is_featured = Column(Boolean, default=False, nullable=False)
    cover_image_id = Column(BigInteger)
    slug = Column(String)
    published_at = Column(DateTime(timezone=True))
    is_published = Column(Boolean, default=False, nullable=False)
    is_deleted = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)


class CmsContentEntry(Base):
    __tablename__ = "cms_content_entry"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    kind_id = Column(Integer, ForeignKey("lu_content_kind.id"), nullable=False)
    slug = Column(String, nullable=False)
    title = Column(Text, nullable=False)
    summary = Column(Text)
    body_json = Column(JSON)
    body_html = Column(Text)
    video_url = Column(String)
    external_url = Column(String)
    cover_image_id = Column(BigInteger)
    author_name = Column(String)
    seo_title = Column(String)
    seo_desc = Column(String)
    published_at = Column(DateTime(timezone=True))
    is_published = Column(Boolean, default=False, nullable=False)
    is_deleted = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)


class User(Base):
    __tablename__ = "user"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, nullable=False, default="staff")  # admin or staff
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)