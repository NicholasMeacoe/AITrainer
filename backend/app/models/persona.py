from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from app.core.database import Base

class Persona(Base):
    __tablename__ = "personas"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)
    description = Column(String, nullable=True)
    is_template = Column(Boolean, default=False)
    
    # Metadata fields
    target_competencies = Column(String, nullable=True)
    difficulty = Column(String, nullable=True)
    estimated_duration = Column(String, nullable=True)

    # Relationships
    modules = relationship("PersonaModule", back_populates="persona", cascade="all, delete-orphan")

    def __init__(self, name: str, description: str = None, is_template: bool = False, 
                 target_competencies: str = None, difficulty: str = None, 
                 estimated_duration: str = None, **kwargs):
        if not name:
            raise TypeError("name is required")
        super().__init__(name=name, description=description, is_template=is_template,
                         target_competencies=target_competencies, difficulty=difficulty,
                         estimated_duration=estimated_duration, **kwargs)
