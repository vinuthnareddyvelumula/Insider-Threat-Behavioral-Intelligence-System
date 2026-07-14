from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.database.database import Base


class Activity(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(String)
    activity_type = Column(String)
    description = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)