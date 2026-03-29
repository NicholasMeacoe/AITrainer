from pydantic import BaseModel
from typing import Optional

class PersonaBase(BaseModel):
    name: str
    description: Optional[str] = None
    is_template: bool = False

class PersonaCreate(PersonaBase):
    pass

class PersonaUpdate(PersonaBase):
    name: Optional[str] = None

class Persona(PersonaBase):
    id: int

    class Config:
        orm_mode = True
