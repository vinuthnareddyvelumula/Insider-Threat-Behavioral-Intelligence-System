from fastapi import FastAPI

from app.database.database import engine, Base
from app.models.user import User
from app.routes.user import router as user_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(user_router)


@app.get("/")
def root():
    return {"message": "Insider Threat Behavioral Intelligence System API"}