import os
from dotenv import load_dotenv
from pydantic import BaseModel, Field

load_dotenv()


class Settings(BaseModel):
    database_url: str = Field(default_factory=lambda: os.getenv("DATABASE_URL", "postgresql://postgres:admin@localhost/pig_farm_db"))
    secret_key: str = Field(default_factory=lambda: os.getenv("SECRET_KEY", "your-secret-key"))
    debug: bool = Field(default_factory=lambda: os.getenv("DEBUG", "true").lower() == "true")


settings = Settings()