from pydantic import BaseModel, ConfigDict
from typing import Optional

class ModuleBase(BaseModel):
    name: str
    description: Optional[str] = None

class ModuleCreate(ModuleBase):
    pass

class ModuleUpdate(ModuleBase):
    name: Optional[str] = None

class Module(ModuleBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
