from sqlalchemy import Column, Integer, String, Text
from database import Base


class LuUnit(Base):
    __tablename__ = "lu_unit"

    id = Column(Integer, primary_key=True, autoincrement=True)
    code = Column(String, unique=True, nullable=False)
    label = Column(Text, nullable=False)


class LuDoseUnit(Base):
    __tablename__ = "lu_dose_unit"

    id = Column(Integer, primary_key=True, autoincrement=True)
    code = Column(String, unique=True, nullable=False)
    label = Column(Text, nullable=False)


class LuMedicineCategory(Base):
    __tablename__ = "lu_medicine_category"

    id = Column(Integer, primary_key=True, autoincrement=True)
    slug = Column(String, unique=True, nullable=False)
    name = Column(String, unique=True, nullable=False)


class LuMedicineLine(Base):
    __tablename__ = "lu_medicine_line"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, unique=True, nullable=False)


class LuPigType(Base):
    __tablename__ = "lu_pig_type"

    id = Column(Integer, primary_key=True, autoincrement=True)
    code = Column(String, unique=True, nullable=False)
    label = Column(Text, nullable=False)


class LuPigBreedLine(Base):
    __tablename__ = "lu_pig_breed_line"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, unique=True, nullable=False)


class LuContentKind(Base):
    __tablename__ = "lu_content_kind"

    id = Column(Integer, primary_key=True, autoincrement=True)
    code = Column(String, unique=True, nullable=False)
    label = Column(Text, nullable=False)