from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routers import pigs, medicines, cms, auth, images, admin

app = FastAPI(title="Pig Farm API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://127.0.0.1:8080"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(pigs.router, prefix="/api/pigs", tags=["Pigs"])
app.include_router(medicines.router, prefix="/api/medicines", tags=["Medicines"])
app.include_router(cms.router, prefix="/api/cms", tags=["CMS"])
app.include_router(images.router, prefix="/api/images", tags=["Images"])
app.include_router(admin.router, prefix="/api/admin", tags=["Admin"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Pig Farm API"}