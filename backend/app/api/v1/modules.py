from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api import deps
from app.models.module import Module as ModuleModel
from app.models.lesson import Lesson as LessonModel
from app.schemas.module import Module, ModuleCreate, ModuleUpdate
from app.schemas.lesson import Lesson as LessonSchema, LessonCreate, LessonUpdate

router = APIRouter()

@router.get("/", response_model=List[Module])
def read_modules(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    modules = db.query(ModuleModel).offset(skip).limit(limit).all()
    return modules

@router.post("/", response_model=Module, status_code=status.HTTP_201_CREATED)
def create_module(
    *,
    db: Session = Depends(deps.get_db),
    module_in: ModuleCreate,
) -> Any:
    module = ModuleModel(
        name=module_in.name,
        description=module_in.description,
    )
    db.add(module)
    db.commit()
    db.refresh(module)
    return module

@router.get("/{id}", response_model=Module)
def read_module(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
) -> Any:
    module = db.query(ModuleModel).filter(ModuleModel.id == id).first()
    if not module:
        raise HTTPException(status_code=404, detail="Module not found")
    return module

# Lesson Endpoints

@router.get("/{module_id}/lessons/", response_model=List[LessonSchema])
def read_lessons(
    *,
    db: Session = Depends(deps.get_db),
    module_id: int,
    skip: int = 0,
    limit: int = 100,
) -> Any:
    module = db.query(ModuleModel).filter(ModuleModel.id == module_id).first()
    if not module:
        raise HTTPException(status_code=404, detail="Module not found")
    lessons = db.query(LessonModel).filter(LessonModel.module_id == module_id).order_by(LessonModel.order).offset(skip).limit(limit).all()
    return lessons

@router.post("/{module_id}/lessons/", response_model=LessonSchema, status_code=status.HTTP_201_CREATED)
def create_lesson(
    *,
    db: Session = Depends(deps.get_db),
    module_id: int,
    lesson_in: LessonCreate,
) -> Any:
    module = db.query(ModuleModel).filter(ModuleModel.id == module_id).first()
    if not module:
        raise HTTPException(status_code=404, detail="Module not found")
    
    lesson = LessonModel(
        **lesson_in.model_dump(),
        module_id=module_id
    )
    db.add(lesson)
    db.commit()
    db.refresh(lesson)
    return lesson

@router.put("/{module_id}/lessons/{lesson_id}", response_model=LessonSchema)
def update_lesson(
    *,
    db: Session = Depends(deps.get_db),
    module_id: int,
    lesson_id: int,
    lesson_in: LessonUpdate,
) -> Any:
    module = db.query(ModuleModel).filter(ModuleModel.id == module_id).first()
    if not module:
        raise HTTPException(status_code=404, detail="Module not found")
    
    lesson = db.query(LessonModel).filter(LessonModel.id == lesson_id, LessonModel.module_id == module_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    
    update_data = lesson_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(lesson, field, value)
    
    db.add(lesson)
    db.commit()
    db.refresh(lesson)
    return lesson

@router.delete("/{module_id}/lessons/{lesson_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_lesson(
    *,
    db: Session = Depends(deps.get_db),
    module_id: int,
    lesson_id: int,
) -> None:
    module = db.query(ModuleModel).filter(ModuleModel.id == module_id).first()
    if not module:
        raise HTTPException(status_code=404, detail="Module not found")
    
    lesson = db.query(LessonModel).filter(LessonModel.id == lesson_id, LessonModel.module_id == module_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    
    db.delete(lesson)
    db.commit()
    return None
