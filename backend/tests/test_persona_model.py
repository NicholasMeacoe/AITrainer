import pytest
from app.models.persona import Persona

def test_persona_creation():
    persona = Persona(name="Junior Engineer", description="Entry level engineer", is_template=True)
    assert persona.name == "Junior Engineer"
    assert persona.description == "Entry level engineer"
    assert persona.is_template is True

def test_persona_validation_name_required():
    with pytest.raises(TypeError):
        Persona(description="No name provided")
