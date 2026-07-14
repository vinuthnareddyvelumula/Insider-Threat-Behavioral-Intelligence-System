from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.activity import Activity

router = APIRouter()

# Risk points for each activity
RISK_POINTS = {
    "Login": 5,
    "File Access": 20,
    "Email": 15,
    "USB Usage": 30
}


@router.get("/detect-anomaly")
def detect_anomaly(db: Session = Depends(get_db)):

    activities = db.query(Activity).all()

    risk_score = 0

    # Calculate total risk score
    for activity in activities:
        risk_score += RISK_POINTS.get(
            activity.activity_type,
            0
        )

    # Determine threat level
    if risk_score > 100:
        threat_level = "Critical"

    elif risk_score > 60:
        threat_level = "High"

    else:
        threat_level = "Normal"

    return {
        "risk_score": risk_score,
        "threat_level": threat_level,
        "total_activities": len(activities)
    }