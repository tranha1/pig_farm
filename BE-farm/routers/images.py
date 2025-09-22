from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Image
from .auth import get_current_active_user
import os
import uuid
from datetime import datetime
from PIL import Image as PILImage
import io

router = APIRouter()

UPLOAD_DIR = "static/uploads"

@router.post("/upload")
async def upload_image(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    """
    Upload an image file and return the image ID.
    """

    # Validate file type
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image")

    # Read file content
    file_content = await file.read()

    # Get image dimensions
    try:
        image = PILImage.open(io.BytesIO(file_content))
        width, height = image.size
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid image file")

    # Create upload directory if it doesn't exist
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    # Generate unique filename
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"

    # Save file
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    with open(file_path, "wb") as f:
        f.write(file_content)

    # Create database record
    db_image = Image(
        filename=file.filename,
        filepath=file_path,
        url=f"/static/uploads/{unique_filename}",
        width=width,
        height=height,
        file_size=len(file_content),
        mime_type=file.content_type
    )

    db.add(db_image)
    db.commit()
    db.refresh(db_image)

    return {"id": db_image.id, "filename": file.filename, "url": db_image.url}

@router.get("/{image_id}")
async def get_image(image_id: int, db: Session = Depends(get_db)):
    """
    Get image information by ID.
    """
    image = db.query(Image).filter(Image.id == image_id).first()
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")

    return {
        "id": image.id,
        "filename": image.filename,
        "url": image.url,
        "width": image.width,
        "height": image.height,
        "file_size": image.file_size,
        "mime_type": image.mime_type,
        "created_at": image.created_at
    }