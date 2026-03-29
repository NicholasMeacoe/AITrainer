import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_module():
    response = client.post(
        "/api/v1/modules/",
        json={"name": "Intro to LLMs", "description": "Basics of Large Language Models"},
    )
    assert response.status_code == 201
    assert response.json()["name"] == "Intro to LLMs"

def test_associate_module_with_persona():
    # 1. Create Persona
    p_resp = client.post("/api/v1/personas/", json={"name": "AI Dev", "description": "Dev persona"})
    persona_id = p_resp.json()["id"]
    
    # 2. Create Module
    m_resp = client.post("/api/v1/modules/", json={"name": "Python for AI", "description": "Python basics"})
    module_id = m_resp.json()["id"]
    
    # 3. Associate
    assoc_resp = client.post(
        f"/api/v1/personas/{persona_id}/modules/",
        json={"module_id": module_id, "order": 1}
    )
    assert assoc_resp.status_code == 200
    
    # 4. Verify in Persona details
    get_resp = client.get(f"/api/v1/personas/{persona_id}")
    data = get_resp.json()
    assert "modules" in data
    assert len(data["modules"]) == 1
    assert data["modules"][0]["name"] == "Python for AI"

def test_persona_metadata():
    p_resp = client.post(
        "/api/v1/personas/",
        json={
            "name": "Metadata Persona",
            "target_competencies": "RAG, Fine-tuning",
            "difficulty": "Intermediate",
            "estimated_duration": "10 hours"
        }
    )
    assert p_resp.status_code == 201
    data = p_resp.json()
    assert data["target_competencies"] == "RAG, Fine-tuning"
    assert data["difficulty"] == "Intermediate"
