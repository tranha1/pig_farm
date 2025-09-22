from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from database import get_db
from models import ProductPig
from pydantic import BaseModel
from .auth import get_current_active_user, require_role

router = APIRouter()

class PigBase(BaseModel):
    pig_type_id: Optional[int] = None
    name: str
    breed_line_id: Optional[int] = None
    unit_id: Optional[int] = None
    price: Optional[float] = None
    note: Optional[str] = None
    is_featured: bool = False
    cover_image_id: Optional[int] = None
    slug: Optional[str] = None
    published_at: Optional[datetime] = None
    is_published: bool = False

class PigCreate(PigBase):
    pass

class Pig(PigBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

@router.get("/", response_model=List[Pig])
def read_pigs(skip: int = 0, limit: int = 100, published: bool = None, db: Session = Depends(get_db)):
    query = db.query(ProductPig)
    if published is not None:
        query = query.filter(ProductPig.is_published == published)
    pigs = query.offset(skip).limit(limit).all()
    return pigs

@router.get("/{pig_id}", response_model=Pig)
def read_pig(pig_id: int, db: Session = Depends(get_db)):
    pig = db.query(ProductPig).filter(ProductPig.id == pig_id).first()
    if pig is None:
        raise HTTPException(status_code=404, detail="Pig not found")
    return pig

@router.post("/", response_model=Pig)
def create_pig(pig: PigCreate, db: Session = Depends(get_db), current_user = Depends(require_role("staff"))):
    db_pig = ProductPig(**pig.dict())
    db.add(db_pig)
    db.commit()
    db.refresh(db_pig)
    return db_pig

@router.put("/{pig_id}", response_model=Pig)
def update_pig(pig_id: int, pig: PigCreate, db: Session = Depends(get_db), current_user = Depends(require_role("staff"))):
    db_pig = db.query(ProductPig).filter(ProductPig.id == pig_id).first()
    if db_pig is None:
        raise HTTPException(status_code=404, detail="Pig not found")
    for key, value in pig.dict().items():
        setattr(db_pig, key, value)
    db.commit()
    db.refresh(db_pig)
    return db_pig

@router.delete("/{pig_id}")
def delete_pig(pig_id: int, db: Session = Depends(get_db), current_user = Depends(require_role("admin"))):
    db_pig = db.query(ProductPig).filter(ProductPig.id == pig_id).first()
    if db_pig is None:
        raise HTTPException(status_code=404, detail="Pig not found")
    db.delete(db_pig)
    db.commit()
    return {"message": "Pig deleted"}