from sqlalchemy import Column, Integer, String, Boolean
from app.core.database import Base

class Persona(Base):
    __tablename__ = "personas"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)
    description = Column(String, nullable=True)
    is_template = Column(Boolean, default=False)

    def __init__(self, name: str, description: str = None, is_template: bool = False, **kwargs):
        if not name:
            raise TypeError("name is required")
        super().__init__(name=name, description=description, is_template=is_template, **kwargs)
