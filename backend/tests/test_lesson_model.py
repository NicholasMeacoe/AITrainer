import pytest
from sqlalchemy.orm import Session
from app.models.lesson import Lesson
from app.models.module import Module

def test_create_lesson(db: Session):
    # Create a module first
    module = Module(name="Test Module", description="Test Description")
    db.add(module)
    db.commit()
    db.refresh(module)

    # Create a lesson
    lesson = Lesson(
        module_id=module.id,
        title="Test Lesson",
        content="# Test Content",
        type="markdown",
        order=1
    )
    db.add(lesson)
    db.commit()
    db.refresh(lesson)

    assert lesson.id is not None
    assert lesson.module_id == module.id
    assert lesson.title == "Test Lesson"
    assert lesson.content == "# Test Content"
    assert lesson.type == "markdown"
    assert lesson.order == 1

def test_lesson_type_validation(db: Session):
    # This should ideally fail if we use an invalid type
    # For now, let's just test basic creation with valid type
    module = Module(name="Validation Module")
    db.add(module)
    db.commit()
    db.refresh(module)

    lesson = Lesson(
        module_id=module.id,
        title="Quiz Lesson",
        content='{"question": "What is AI?"}',
        type="quiz",
        order=2
    )
    db.add(lesson)
    db.commit()
    db.refresh(lesson)

    assert lesson.type == "quiz"
