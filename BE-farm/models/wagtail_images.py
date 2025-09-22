from sqlalchemy import Column, Integer, String, BigInteger, DateTime, Text
from sqlalchemy.sql import func
from database import Base


class Image(Base):
    __tablename__ = "images"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    filename = Column(String(255), nullable=False)
    filepath = Column(String(500), nullable=False)
    url = Column(String(500), nullable=False)
    width = Column(Integer)
    height = Column(Integer)
    file_size = Column(Integer)
    mime_type = Column(String(100))
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)