from pydantic import BaseModel


class EmployeeCreate(BaseModel):
    employee_id: str
    name: str
    email: str
    department: str
    designation: str


class EmployeeResponse(BaseModel):
    id: int
    employee_id: str
    name: str
    email: str
    department: str
    designation: str
    status: str

    class Config:
        from_attributes = True