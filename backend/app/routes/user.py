from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate

router = APIRouter()


@router.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):

    new_user = User(
        username=user.username,
        email=user.email,
        password=user.password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully",
        "user_id": new_user.id
    }
@router.get("/users")
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users
@router.get("/users/{user_id}")
def get_user_by_id(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        return {"message": "User not found"}

    return user