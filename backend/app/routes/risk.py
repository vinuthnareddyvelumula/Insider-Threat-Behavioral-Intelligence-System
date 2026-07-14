from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.activity import Activity

router = APIRouter()

RISK_POINTS = {
    "Login": 5,
    "File Access": 20,
    "Email": 15,
    "USB Usage": 30
}

@router.get("/risk-score")
def get_risk_score(db: Session = Depends(get_db)):

    activities = db.query(Activity).all()

    score = 0

    for activity in activities:
        score += RISK_POINTS.get(
            activity.activity_type,
            0
        )

    return {
        "risk_score": score
    }