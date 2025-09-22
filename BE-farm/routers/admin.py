from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from database import get_db
from models import ProductPig, ProductMedicine, CmsContentEntry
from .auth import require_role
import pandas as pd
import io
from fastapi.responses import StreamingResponse

router = APIRouter()

# Export endpoints

@router.get("/export/pigs/template")
def export_pigs_template(db: Session = Depends(get_db), current_user = Depends(require_role("staff"))):
    # Create template with sample data
    template_data = {
        'pig_type_id': [1],
        'name': ['Sample Pig Name'],
        'breed_line_id': [1],
        'unit_id': [1],
        'price': [100.0],
        'note': ['Sample note'],
        'is_featured': [False],
        'slug': ['sample-pig'],
        'is_published': [False]
    }
    df = pd.DataFrame(template_data)
    
    # Create Excel file in memory
    output = io.BytesIO()
    df.to_excel(output, sheet_name='Pigs', index=False, engine='openpyxl')
    output.seek(0)
    
    return StreamingResponse(
        output,
        media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        headers={"Content-Disposition": "attachment; filename=pigs_template.xlsx"}
    )

@router.get("/export/pigs")
def export_pigs(db: Session = Depends(get_db), current_user = Depends(require_role("staff"))):
    pigs = db.query(ProductPig).filter(ProductPig.is_deleted == False).all()
    
    data = []
    for pig in pigs:
        data.append({
            'id': pig.id,
            'pig_type_id': pig.pig_type_id,
            'name': pig.name,
            'breed_line_id': pig.breed_line_id,
            'unit_id': pig.unit_id,
            'price': float(pig.price) if pig.price else None,
            'note': pig.note,
            'is_featured': pig.is_featured,
            'slug': pig.slug,
            'is_published': pig.is_published,
            'created_at': pig.created_at.isoformat() if pig.created_at else None,
            'updated_at': pig.updated_at.isoformat() if pig.updated_at else None
        })
    
    df = pd.DataFrame(data)
    output = io.BytesIO()
    df.to_excel(output, sheet_name='Pigs', index=False, engine='openpyxl')
    output.seek(0)
    
    return StreamingResponse(
        output,
        media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        headers={"Content-Disposition": "attachment; filename=pigs_data.xlsx"}
    )

@router.get("/export/medicines/template")
def export_medicines_template(db: Session = Depends(get_db), current_user = Depends(require_role("staff"))):
    template_data = {
        'name': ['Sample Medicine'],
        'category_id': [1],
        'line_id': [1],
        'ingredients': ['Sample ingredients'],
        'indications': ['Sample indications'],
        'packaging': ['Sample packaging'],
        'unit_id': [1],
        'price_unit': [50.0],
        'price_total': [100.0],
        'dose_unit_id': [1],
        'price_per_dose': [5.0],
        'support_price_per_dose': [4.0],
        'is_featured': [False],
        'slug': ['sample-medicine'],
        'is_published': [False]
    }
    df = pd.DataFrame(template_data)
    
    output = io.BytesIO()
    df.to_excel(output, sheet_name='Medicines', index=False, engine='openpyxl')
    output.seek(0)
    
    return StreamingResponse(
        output,
        media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        headers={"Content-Disposition": "attachment; filename=medicines_template.xlsx"}
    )

@router.get("/export/medicines")
def export_medicines(db: Session = Depends(get_db), current_user = Depends(require_role("staff"))):
    medicines = db.query(ProductMedicine).filter(ProductMedicine.is_deleted == False).all()
    
    data = []
    for med in medicines:
        data.append({
            'id': med.id,
            'name': med.name,
            'category_id': med.category_id,
            'line_id': med.line_id,
            'ingredients': med.ingredients,
            'indications': med.indications,
            'packaging': med.packaging,
            'unit_id': med.unit_id,
            'price_unit': float(med.price_unit) if med.price_unit else None,
            'price_total': float(med.price_total) if med.price_total else None,
            'dose_unit_id': med.dose_unit_id,
            'price_per_dose': float(med.price_per_dose) if med.price_per_dose else None,
            'support_price_per_dose': float(med.support_price_per_dose) if med.support_price_per_dose else None,
            'is_featured': med.is_featured,
            'slug': med.slug,
            'is_published': med.is_published,
            'created_at': med.created_at.isoformat() if med.created_at else None,
            'updated_at': med.updated_at.isoformat() if med.updated_at else None
        })
    
    df = pd.DataFrame(data)
    output = io.BytesIO()
    df.to_excel(output, sheet_name='Medicines', index=False, engine='openpyxl')
    output.seek(0)
    
    return StreamingResponse(
        output,
        media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        headers={"Content-Disposition": "attachment; filename=medicines_data.xlsx"}
    )

@router.get("/export/cms/template")
def export_cms_template(db: Session = Depends(get_db), current_user = Depends(require_role("staff"))):
    template_data = {
        'kind_id': [1],
        'slug': ['sample-article'],
        'title': ['Sample Article Title'],
        'summary': ['Sample summary'],
        'body_html': ['<p>Sample HTML content</p>'],
        'video_url': ['https://example.com/video'],
        'external_url': ['https://example.com'],
        'author_name': ['Sample Author'],
        'seo_title': ['Sample SEO Title'],
        'seo_desc': ['Sample SEO Description'],
        'is_published': [False]
    }
    df = pd.DataFrame(template_data)
    
    output = io.BytesIO()
    df.to_excel(output, sheet_name='CMS', index=False, engine='openpyxl')
    output.seek(0)
    
    return StreamingResponse(
        output,
        media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        headers={"Content-Disposition": "attachment; filename=cms_template.xlsx"}
    )

@router.get("/export/cms")
def export_cms(db: Session = Depends(get_db), current_user = Depends(require_role("staff"))):
    cms_entries = db.query(CmsContentEntry).filter(CmsContentEntry.is_deleted == False).all()
    
    data = []
    for entry in cms_entries:
        data.append({
            'id': entry.id,
            'kind_id': entry.kind_id,
            'slug': entry.slug,
            'title': entry.title,
            'summary': entry.summary,
            'body_html': entry.body_html,
            'video_url': entry.video_url,
            'external_url': entry.external_url,
            'author_name': entry.author_name,
            'seo_title': entry.seo_title,
            'seo_desc': entry.seo_desc,
            'is_published': entry.is_published,
            'created_at': entry.created_at.isoformat() if entry.created_at else None,
            'updated_at': entry.updated_at.isoformat() if entry.updated_at else None
        })
    
    df = pd.DataFrame(data)
    output = io.BytesIO()
    df.to_excel(output, sheet_name='CMS', index=False, engine='openpyxl')
    output.seek(0)
    
    return StreamingResponse(
        output,
        media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        headers={"Content-Disposition": "attachment; filename=cms_data.xlsx"}
    )

# Import endpoints

@router.post("/import/pigs")
def import_pigs(file: UploadFile = File(...), db: Session = Depends(get_db), current_user = Depends(require_role("staff"))):
    if not file.filename.endswith(('.xlsx', '.xls')):
        raise HTTPException(status_code=400, detail="File must be Excel format")
    
    try:
        contents = file.file.read()
        df = pd.read_excel(io.BytesIO(contents))
        
        imported_count = 0
        errors = []
        
        for index, row in df.iterrows():
            try:
                pig = ProductPig(
                    pig_type_id=int(row['pig_type_id']) if pd.notna(row.get('pig_type_id')) else None,
                    name=str(row['name']) if pd.notna(row.get('name')) else None,
                    breed_line_id=int(row['breed_line_id']) if pd.notna(row.get('breed_line_id')) else None,
                    unit_id=int(row['unit_id']) if pd.notna(row.get('unit_id')) else None,
                    price=float(row['price']) if pd.notna(row.get('price')) else None,
                    note=str(row['note']) if pd.notna(row.get('note')) else None,
                    is_featured=bool(row['is_featured']) if pd.notna(row.get('is_featured')) else False,
                    slug=str(row['slug']) if pd.notna(row.get('slug')) else None,
                    is_published=bool(row['is_published']) if pd.notna(row.get('is_published')) else False,
                    is_deleted=False
                )
                db.add(pig)
                imported_count += 1
            except Exception as e:
                errors.append(f"Row {index + 1}: {str(e)}")
        
        db.commit()
        
        return {
            "message": f"Imported {imported_count} pigs successfully",
            "errors": errors
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing file: {str(e)}")

@router.post("/import/medicines")
def import_medicines(file: UploadFile = File(...), db: Session = Depends(get_db), current_user = Depends(require_role("staff"))):
    if not file.filename.endswith(('.xlsx', '.xls')):
        raise HTTPException(status_code=400, detail="File must be Excel format")
    
    try:
        contents = file.file.read()
        df = pd.read_excel(io.BytesIO(contents))
        
        imported_count = 0
        errors = []
        
        for index, row in df.iterrows():
            try:
                medicine = ProductMedicine(
                    name=str(row['name']) if pd.notna(row.get('name')) else None,
                    category_id=int(row['category_id']) if pd.notna(row.get('category_id')) else None,
                    line_id=int(row['line_id']) if pd.notna(row.get('line_id')) else None,
                    ingredients=str(row['ingredients']) if pd.notna(row.get('ingredients')) else None,
                    indications=str(row['indications']) if pd.notna(row.get('indications')) else None,
                    packaging=str(row['packaging']) if pd.notna(row.get('packaging')) else None,
                    unit_id=int(row['unit_id']) if pd.notna(row.get('unit_id')) else None,
                    price_unit=float(row['price_unit']) if pd.notna(row.get('price_unit')) else None,
                    price_total=float(row['price_total']) if pd.notna(row.get('price_total')) else None,
                    dose_unit_id=int(row['dose_unit_id']) if pd.notna(row.get('dose_unit_id')) else None,
                    price_per_dose=float(row['price_per_dose']) if pd.notna(row.get('price_per_dose')) else None,
                    support_price_per_dose=float(row['support_price_per_dose']) if pd.notna(row.get('support_price_per_dose')) else None,
                    is_featured=bool(row['is_featured']) if pd.notna(row.get('is_featured')) else False,
                    slug=str(row['slug']) if pd.notna(row.get('slug')) else None,
                    is_published=bool(row['is_published']) if pd.notna(row.get('is_published')) else False,
                    is_deleted=False
                )
                db.add(medicine)
                imported_count += 1
            except Exception as e:
                errors.append(f"Row {index + 1}: {str(e)}")
        
        db.commit()
        
        return {
            "message": f"Imported {imported_count} medicines successfully",
            "errors": errors
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing file: {str(e)}")

@router.post("/import/cms")
def import_cms(file: UploadFile = File(...), db: Session = Depends(get_db), current_user = Depends(require_role("staff"))):
    if not file.filename.endswith(('.xlsx', '.xls')):
        raise HTTPException(status_code=400, detail="File must be Excel format")
    
    try:
        contents = file.file.read()
        df = pd.read_excel(io.BytesIO(contents))
        
        imported_count = 0
        errors = []
        
        for index, row in df.iterrows():
            try:
                cms_entry = CmsContentEntry(
                    kind_id=int(row['kind_id']) if pd.notna(row.get('kind_id')) else None,
                    slug=str(row['slug']) if pd.notna(row.get('slug')) else None,
                    title=str(row['title']) if pd.notna(row.get('title')) else None,
                    summary=str(row['summary']) if pd.notna(row.get('summary')) else None,
                    body_html=str(row['body_html']) if pd.notna(row.get('body_html')) else None,
                    video_url=str(row['video_url']) if pd.notna(row.get('video_url')) else None,
                    external_url=str(row['external_url']) if pd.notna(row.get('external_url')) else None,
                    author_name=str(row['author_name']) if pd.notna(row.get('author_name')) else None,
                    seo_title=str(row['seo_title']) if pd.notna(row.get('seo_title')) else None,
                    seo_desc=str(row['seo_desc']) if pd.notna(row.get('seo_desc')) else None,
                    is_published=bool(row['is_published']) if pd.notna(row.get('is_published')) else False,
                    is_deleted=False
                )
                db.add(cms_entry)
                imported_count += 1
            except Exception as e:
                errors.append(f"Row {index + 1}: {str(e)}")
        
        db.commit()
        
        return {
            "message": f"Imported {imported_count} CMS entries successfully",
            "errors": errors
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing file: {str(e)}")