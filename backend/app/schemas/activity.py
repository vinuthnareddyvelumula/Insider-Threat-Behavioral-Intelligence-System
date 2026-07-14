from pydantic import BaseModel


class ActivityCreate(BaseModel):
    employee_id: str
    activity_type: str
    description: str


class ActivityResponse(BaseModel):
    id: int
    employee_id: str
    activity_type: str
    description: str

    class Config:
        from_attributes = True