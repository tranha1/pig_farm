from sqlalchemy import Column, Integer, BigInteger, ForeignKey
from database import Base


class ProductPigImage(Base):
    __tablename__ = "product_pig_image"

    pig_id = Column(BigInteger, ForeignKey("product_pig.id", ondelete="CASCADE"), primary_key=True)
    image_id = Column(BigInteger, primary_key=True)
    sort = Column(Integer, default=0, nullable=False)


class ProductMedicineImage(Base):
    __tablename__ = "product_medicine_image"

    medicine_id = Column(BigInteger, ForeignKey("product_medicine.id", ondelete="CASCADE"), primary_key=True)
    image_id = Column(BigInteger, primary_key=True)
    sort = Column(Integer, default=0, nullable=False)