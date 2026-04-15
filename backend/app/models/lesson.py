from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
import enum
from app.core.database import Base

class LessonType(str, enum.Enum):
    markdown = "markdown"
    quiz = "quiz"

class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(Integer, primary_key=True, index=True)
    module_id = Column(Integer, ForeignKey("modules.id"), nullable=False)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)  # Markdown or JSON for quiz
    type = Column(String, nullable=False, default=LessonType.markdown)
    order = Column(Integer, nullable=False, default=0)

    # Relationships
    module = relationship("Module", backref="lessons")
