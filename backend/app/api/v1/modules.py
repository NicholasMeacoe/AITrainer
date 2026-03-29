from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api import deps
from app.models.module import Module as ModuleModel
from app.schemas.module import Module, ModuleCreate, ModuleUpdate

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
