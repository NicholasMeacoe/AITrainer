import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_lesson():
    # Create module first
    mod_resp = client.post(
        "/api/v1/modules/",
        json={"name": "API Test Module", "description": "Desc"},
    )
    module_id = mod_resp.json()["id"]

    # Create lesson
    response = client.post(
        f"/api/v1/modules/{module_id}/lessons/",
        json={
            "title": "Intro to AI",
            "content": "# Intro",
            "type": "markdown",
            "order": 1
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Intro to AI"
    assert data["module_id"] == module_id
    assert "id" in data

def test_read_lessons_order():
    # Create module
    mod_resp = client.post(
        "/api/v1/modules/",
        json={"name": "Order Test Module", "description": "Desc"},
    )
    module_id = mod_resp.json()["id"]

    # Create lessons out of order
    client.post(
        f"/api/v1/modules/{module_id}/lessons/",
        json={"title": "Lesson 2", "content": "C2", "order": 2},
    )
    client.post(
        f"/api/v1/modules/{module_id}/lessons/",
        json={"title": "Lesson 1", "content": "C1", "order": 1},
    )

    response = client.get(f"/api/v1/modules/{module_id}/lessons/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    assert data[0]["title"] == "Lesson 1"
    assert data[1]["title"] == "Lesson 2"

def test_update_lesson():
    mod_resp = client.post(
        "/api/v1/modules/",
        json={"name": "Update Test Module"},
    )
    module_id = mod_resp.json()["id"]
    
    les_resp = client.post(
        f"/api/v1/modules/{module_id}/lessons/",
        json={"title": "Original Title", "content": "Original Content"},
    )
    lesson_id = les_resp.json()["id"]

    response = client.put(
        f"/api/v1/modules/{module_id}/lessons/{lesson_id}",
        json={"title": "Updated Title"},
    )
    assert response.status_code == 200
    assert response.json()["title"] == "Updated Title"
    assert response.json()["content"] == "Original Content"

def test_delete_lesson():
    mod_resp = client.post(
        "/api/v1/modules/",
        json={"name": "Delete Test Module"},
    )
    module_id = mod_resp.json()["id"]
    
    les_resp = client.post(
        f"/api/v1/modules/{module_id}/lessons/",
        json={"title": "To Delete", "content": "C"},
    )
    lesson_id = les_resp.json()["id"]

    response = client.delete(f"/api/v1/modules/{module_id}/lessons/{lesson_id}")
    assert response.status_code == 204
    
    # Verify it's gone
    get_resp = client.get(f"/api/v1/modules/{module_id}/lessons/")
    assert len(get_resp.json()) == 0
