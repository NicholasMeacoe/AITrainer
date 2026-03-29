from pydantic import BaseModel, ConfigDict
from typing import Optional, List

class PersonaBase(BaseModel):
    name: str
    description: Optional[str] = None
    is_template: bool = False
    target_competencies: Optional[str] = None
    difficulty: Optional[str] = None
    estimated_duration: Optional[str] = None

class PersonaCreate(PersonaBase):
    pass

class PersonaUpdate(PersonaBase):
    name: Optional[str] = None

class Persona(PersonaBase):
    id: int
    modules: List["PersonaModuleSchema"] = []

    model_config = ConfigDict(from_attributes=True)

class PersonaModuleBase(BaseModel):
    module_id: int
    order: int

class PersonaModuleCreate(PersonaModuleBase):
    pass

class PersonaModuleSchema(PersonaModuleBase):
    name: str
    description: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)
