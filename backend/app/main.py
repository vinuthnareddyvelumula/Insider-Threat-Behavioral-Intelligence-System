from fastapi import FastAPI

from app.database.database import engine, Base
from app.models.user import User
from app.routes.user import router as user_router
from app.models.employee import Employee
from app.routes.employee import router as employee_router
from app.models.activity import Activity
from app.routes.activity import router as activity_router
from fastapi.middleware.cors import CORSMiddleware
from app.routes.risk import router as risk_router
from app.routes.anomaly import router as anomaly_router

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)
app.include_router(employee_router)
app.include_router(activity_router)
app.include_router(risk_router)
app.include_router(anomaly_router)


@app.get("/")
def root():
    return {"message": "Insider Threat Behavioral Intelligence System API"}
