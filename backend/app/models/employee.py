from sqlalchemy import Column, Integer, String

from app.database.database import Base


class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)

    employee_id = Column(String, unique=True, nullable=False)

    name = Column(String, nullable=False)

    email = Column(String, unique=True, nullable=False)

    department = Column(String)

    designation = Column(String)

    status = Column(String, default="Active")