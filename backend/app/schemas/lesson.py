from pydantic import BaseModel, ConfigDict
from typing import Optional
from app.models.lesson import LessonType

class LessonBase(BaseModel):
    title: str
    content: str
    type: LessonType = LessonType.markdown
    order: int = 0

class LessonCreate(LessonBase):
    pass

class LessonUpdate(LessonBase):
    title: Optional[str] = None
    content: Optional[str] = None
    type: Optional[LessonType] = None
    order: Optional[int] = None

class Lesson(LessonBase):
    id: int
    module_id: int

    model_config = ConfigDict(from_attributes=True)
