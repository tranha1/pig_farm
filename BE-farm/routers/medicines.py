from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from database import get_db
from models import ProductMedicine
from pydantic import BaseModel
from .auth import get_current_active_user, require_role

router = APIRouter()

class MedicineBase(BaseModel):
    name: str
    category_id: Optional[int] = None
    line_id: Optional[int] = None
    ingredients: Optional[str] = None
    indications: Optional[str] = None
    packaging: Optional[str] = None
    unit_id: Optional[int] = None
    price_unit: Optional[float] = None
    price_total: Optional[float] = None
    dose_unit_id: Optional[int] = None
    price_per_dose: Optional[float] = None
    support_price_per_dose: Optional[float] = None
    is_featured: bool = False
    cover_image_id: Optional[int] = None
    slug: Optional[str] = None
    published_at: Optional[datetime] = None
    is_published: bool = False

class MedicineCreate(MedicineBase):
    pass

class Medicine(MedicineBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

@router.get("/", response_model=List[Medicine])
def read_medicines(skip: int = 0, limit: int = 100, published: Optional[bool] = None, db: Session = Depends(get_db)):
    query = db.query(ProductMedicine)
    if published is not None:
        query = query.filter(ProductMedicine.is_published == published)
    medicines = query.order_by(ProductMedicine.created_at.desc()).offset(skip).limit(limit).all()
    return medicines

@router.get("/{medicine_id}", response_model=Medicine)
def read_medicine(medicine_id: int, db: Session = Depends(get_db)):
    medicine = db.query(ProductMedicine).filter(ProductMedicine.id == medicine_id).first()
    if medicine is None:
        raise HTTPException(status_code=404, detail="Medicine not found")
    return medicine

@router.post("/", response_model=Medicine)
def create_medicine(medicine: MedicineCreate, db: Session = Depends(get_db), current_user = Depends(require_role("staff"))):
    db_medicine = ProductMedicine(**medicine.dict())
    db.add(db_medicine)
    db.commit()
    db.refresh(db_medicine)
    return db_medicine

@router.put("/{medicine_id}", response_model=Medicine)
def update_medicine(medicine_id: int, medicine: MedicineCreate, db: Session = Depends(get_db), current_user = Depends(require_role("staff"))):
    db_medicine = db.query(ProductMedicine).filter(ProductMedicine.id == medicine_id).first()
    if db_medicine is None:
        raise HTTPException(status_code=404, detail="Medicine not found")
    for key, value in medicine.dict().items():
        setattr(db_medicine, key, value)
    db.commit()
    db.refresh(db_medicine)
    return db_medicine

@router.delete("/{medicine_id}")
def delete_medicine(medicine_id: int, db: Session = Depends(get_db), current_user = Depends(require_role("admin"))):
    db_medicine = db.query(ProductMedicine).filter(ProductMedicine.id == medicine_id).first()
    if db_medicine is None:
        raise HTTPException(status_code=404, detail="Medicine not found")
    db.delete(db_medicine)
    db.commit()
    return {"message": "Medicine deleted"}