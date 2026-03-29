from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class Module(Base):
    __tablename__ = "modules"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)
    description = Column(String, nullable=True)

    # Relationships
    personas = relationship("PersonaModule", back_populates="module")

class PersonaModule(Base):
    __tablename__ = "persona_modules"

    persona_id = Column(Integer, ForeignKey("personas.id"), primary_key=True)
    module_id = Column(Integer, ForeignKey("modules.id"), primary_key=True)
    order = Column(Integer, nullable=False, default=0)

    # Relationships
    persona = relationship("Persona", back_populates="modules")
    module = relationship("Module", back_populates="personas")

    @property
    def name(self):
        return self.module.name

    @property
    def description(self):
        return self.module.description
