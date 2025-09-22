from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
from datetime import datetime
from database import get_db
from models import CmsContentEntry
from pydantic import BaseModel

router = APIRouter()

class CmsBase(BaseModel):
    kind_id: int
    slug: str
    title: str
    summary: Optional[str] = None
    body_json: Optional[Any] = None
    body_html: Optional[str] = None
    video_url: Optional[str] = None
    external_url: Optional[str] = None
    cover_image_id: Optional[int] = None
    author_name: Optional[str] = None
    seo_title: Optional[str] = None
    seo_desc: Optional[str] = None
    published_at: Optional[datetime] = None
    is_published: bool = False

class CmsCreate(CmsBase):
    pass

class Cms(CmsBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

@router.get("/", response_model=List[Cms])
def read_cms(skip: int = 0, limit: int = 100, published: Optional[bool] = None, db: Session = Depends(get_db)):
    query = db.query(CmsContentEntry)
    if published is not None:
        query = query.filter(CmsContentEntry.is_published == published)
    cms = query.offset(skip).limit(limit).all()
    return cms

@router.get("/{cms_id}", response_model=Cms)
def read_cms_entry(cms_id: int, db: Session = Depends(get_db)):
    cms = db.query(CmsContentEntry).filter(CmsContentEntry.id == cms_id).first()
    if cms is None:
        raise HTTPException(status_code=404, detail="CMS entry not found")
    return cms

@router.post("/", response_model=Cms)
def create_cms(cms: CmsCreate, db: Session = Depends(get_db)):
    db_cms = CmsContentEntry(**cms.dict())
    db.add(db_cms)
    db.commit()
    db.refresh(db_cms)
    return db_cms

@router.put("/{cms_id}", response_model=Cms)
def update_cms(cms_id: int, cms: CmsCreate, db: Session = Depends(get_db)):
    db_cms = db.query(CmsContentEntry).filter(CmsContentEntry.id == cms_id).first()
    if db_cms is None:
        raise HTTPException(status_code=404, detail="CMS entry not found")
    for key, value in cms.dict().items():
        setattr(db_cms, key, value)
    db.commit()
    db.refresh(db_cms)
    return db_cms

@router.delete("/{cms_id}")
def delete_cms(cms_id: int, db: Session = Depends(get_db)):
    db_cms = db.query(CmsContentEntry).filter(CmsContentEntry.id == cms_id).first()
    if db_cms is None:
        raise HTTPException(status_code=404, detail="CMS entry not found")
    db.delete(db_cms)
    db.commit()
    return {"message": "CMS entry deleted"}