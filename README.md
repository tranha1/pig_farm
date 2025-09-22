# Pig Farm Application

A comprehensive pig farm management application with backend API and frontend interface.

## Architecture

- **Backend**: FastAPI with PostgreSQL database
- **Frontend**: React + TypeScript with Vite
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Containerization**: Docker with docker-compose

## Features

- Admin authentication and authorization
- Product management (pigs and medicines)
- CMS content management (news, contact, process)
- Image upload and management
- Customer-facing pages with pagination

## Quick Start with Docker

1. **Clone the repository and navigate to the project directory**

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration:
   - `DATABASE_URL`: PostgreSQL connection string
   - `SECRET_KEY`: JWT secret key
   - `DEBUG`: Set to `true` for development

3. **Start the application**
   ```bash
   docker-compose up --build
   ```

4. **Seed the database with sample data**
   ```bash
   # Run this inside the backend container
   docker-compose exec backend python seed.py
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## Development Setup

### Backend

1. Navigate to `BE-farm/` directory
2. Create virtual environment: `python -m venv .venv`
3. Activate: `.venv\Scripts\activate` (Windows) or `source .venv/bin/activate` (Linux/Mac)
4. Install dependencies: `pip install -r requirements.txt`
5. Run database migrations: `alembic upgrade head`
6. Seed data: `python seed.py`
7. Start server: `uvicorn main:app --reload`

### Frontend

1. Navigate to `FE-farm/` directory
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

## Database Schema

The application uses the following main tables:
- `user`: Admin users
- `product_pig`: Pig products
- `product_medicine`: Medicine products
- `cms_content_entry`: News and content pages
- `images`: Uploaded images
- Lookup tables: `lu_unit`, `lu_dose_unit`, `lu_medicine_category`, etc.

## API Endpoints

- `POST /auth/login`: Admin login
- `GET /products/pigs`: List pig products
- `GET /products/medicines`: List medicine products
- `GET /cms/news`: List news articles
- `POST /images/upload`: Upload images

## Default Admin Credentials

- Username: `admin`
- Password: `admin123`

## License

This project is for educational purposes.