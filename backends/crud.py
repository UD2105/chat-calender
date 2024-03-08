from sqlalchemy.orm import Session
from passlib.context import CryptContext
import models, schemas

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    fake_hashed_password = get_password_hash(user.password)
    db_user = models.User(email=user.email, hashed_password=fake_hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_events(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Event).offset(skip).limit(limit).all()

def get_event(db: Session, event_id: int):
    return db.query(models.Event).filter(models.Event.id == event_id).first()

def get_group(db: Session, group_id: int):
    return db.query(models.Group).filter(models.Group.id == group_id).first()

def get_groups(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Group).offset(skip).limit(limit).all()

def get_group_by_name(db: Session, name: str):
    return db.query(models.Group).filter(models.Group.name == name).first()

def get_events_by_userid(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    event_list = []
    user = get_user(db,user_id)
    for group in user.groups:
        for member in group.members:
            print(member)
            event_list.extend(member.events)
    return event_list

def create_group(db: Session, group: schemas.GroupCreate):
    db_group = models.Group(name =group.name)
    db.add(db_group)
    db.commit()
    db.refresh(db_group)
    return db_group

def create_user_event(db: Session, event: schemas.EventCreate, user_id: int):
    db_event = models.Event(**event.dict(), owner_id=user_id)
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event
