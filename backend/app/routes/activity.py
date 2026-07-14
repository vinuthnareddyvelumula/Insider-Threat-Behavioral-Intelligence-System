from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.activity import Activity
from app.schemas.activity import ActivityCreate

router = APIRouter()


@router.post("/activities")
def create_activity(
    activity: ActivityCreate,
    db: Session = Depends(get_db)
):

    new_activity = Activity(
        employee_id=activity.employee_id,
        activity_type=activity.activity_type,
        description=activity.description
    )

    db.add(new_activity)
    db.commit()
    db.refresh(new_activity)

    return {
        "message": "Activity logged successfully",
        "activity_id": new_activity.id
    }


@router.get("/activities")
def get_all_activities(db: Session = Depends(get_db)):

    activities = db.query(Activity).all()

    return activities