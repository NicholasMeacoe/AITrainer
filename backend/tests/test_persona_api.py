import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_persona():
    response = client.post(
        "/api/v1/personas/",
        json={"name": "Junior Engineer", "description": "Entry level", "is_template": True},
    )
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Junior Engineer"
    assert "id" in data

def test_read_personas():
    response = client.get("/api/v1/personas/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_read_persona():
    # Create one first
    create_resp = client.post(
        "/api/v1/personas/",
        json={"name": "Staff Engineer", "description": "Senior level"},
    )
    persona_id = create_resp.json()["id"]
    
    response = client.get(f"/api/v1/personas/{persona_id}")
    assert response.status_code == 200
    assert response.json()["name"] == "Staff Engineer"

def test_update_persona():
    create_resp = client.post(
        "/api/v1/personas/",
        json={"name": "Product Owner", "description": "Business side"},
    )
    persona_id = create_resp.json()["id"]
    
    response = client.put(
        f"/api/v1/personas/{persona_id}",
        json={"name": "Product Owner Updated", "description": "Updated desc"},
    )
    assert response.status_code == 200
    assert response.json()["name"] == "Product Owner Updated"

def test_delete_persona():
    create_resp = client.post(
        "/api/v1/personas/",
        json={"name": "To Delete", "description": "Will be removed"},
    )
    persona_id = create_resp.json()["id"]
    
    response = client.delete(f"/api/v1/personas/{persona_id}")
    assert response.status_code == 204
    
    # Verify it's gone
    get_resp = client.get(f"/api/v1/personas/{persona_id}")
    assert get_resp.status_code == 404

def test_read_persona_not_found():
    response = client.get("/api/v1/personas/9999")
    assert response.status_code == 404

def test_update_persona_not_found():
    response = client.put(
        "/api/v1/personas/9999",
        json={"name": "Does Not Exist"},
    )
    assert response.status_code == 404

def test_delete_persona_not_found():
    response = client.delete("/api/v1/personas/9999")
    assert response.status_code == 404
