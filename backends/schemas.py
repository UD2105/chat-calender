from pydantic import BaseModel
import datetime

class EventBase(BaseModel):
    title: str
    description: str | None = None
    date:  datetime.datetime


class EventCreate(EventBase):
    pass


class Event(EventBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    is_active: bool
    Events: list[Event] = []

    class Config:
        orm_mode = True

class GroupBase(BaseModel):
    name: int

class Group(GroupBase):
    id: int

    members: list[User] = []
    class Config:
        orm_mode = True

class UserCreate(UserBase):
    pass