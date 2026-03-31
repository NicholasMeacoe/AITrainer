from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session

from app.api import deps
from app.core.ai import get_ai_draft
from app.models.persona import Persona as PersonaModel
from app.models.module import PersonaModule as PersonaModuleModel
from app.schemas.persona import Persona, PersonaCreate, PersonaUpdate, PersonaModuleCreate, PersonaModuleSchema
from app.schemas.module import ModuleCreate as ModuleCreateSchema

router = APIRouter()

@router.get("/", response_model=List[Persona])
def read_personas(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    personas = db.query(PersonaModel).offset(skip).limit(limit).all()
    return personas

@router.post("/", response_model=Persona, status_code=status.HTTP_201_CREATED)
def create_persona(
    *,
    db: Session = Depends(deps.get_db),
    persona_in: PersonaCreate,
) -> Any:
    persona = PersonaModel(
        name=persona_in.name,
        description=persona_in.description,
        is_template=persona_in.is_template,
        target_competencies=persona_in.target_competencies,
        difficulty=persona_in.difficulty,
        estimated_duration=persona_in.estimated_duration,
    )
    db.add(persona)
    db.commit()
    db.refresh(persona)
    return persona

@router.get("/{id}", response_model=Persona)
def read_persona(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
) -> Any:
    persona = db.query(PersonaModel).filter(PersonaModel.id == id).first()
    if not persona:
        raise HTTPException(status_code=404, detail="Persona not found")
    return persona

@router.put("/{id}", response_model=Persona)
def update_persona(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    persona_in: PersonaUpdate,
) -> Any:
    persona = db.query(PersonaModel).filter(PersonaModel.id == id).first()
    if not persona:
        raise HTTPException(status_code=404, detail="Persona not found")
    
    update_data = persona_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(persona, field, value)
    
    db.add(persona)
    db.commit()
    db.refresh(persona)
    return persona

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_persona(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
):
    persona = db.query(PersonaModel).filter(PersonaModel.id == id).first()
    if not persona:
        raise HTTPException(status_code=404, detail="Persona not found")
    db.delete(persona)
    db.commit()

@router.post("/{id}/modules/", response_model=PersonaModuleSchema)
def associate_module(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    assoc_in: PersonaModuleCreate,
) -> Any:
    persona = db.query(PersonaModel).filter(PersonaModel.id == id).first()
    if not persona:
        raise HTTPException(status_code=404, detail="Persona not found")
    
    assoc = PersonaModuleModel(
        persona_id=id,
        module_id=assoc_in.module_id,
        order=assoc_in.order
    )
    db.add(assoc)
    db.commit()
    db.refresh(assoc)
    return assoc

@router.post("/{id}/draft", response_model=List[ModuleCreateSchema])
def draft_persona_plan(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
) -> Any:
    persona = db.query(PersonaModel).filter(PersonaModel.id == id).first()
    if not persona:
        raise HTTPException(status_code=404, detail="Persona not found")
    
    # Call AI service
    suggestions = get_ai_draft(persona.name, persona.description)
    return suggestions
