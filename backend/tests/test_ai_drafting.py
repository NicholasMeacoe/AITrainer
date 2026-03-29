import pytest
from unittest.mock import patch
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_draft_persona_plan():
    # Mock the AI service call
    mock_suggestions = [
        {"name": "AI Ethics", "description": "Understanding bias and safety"},
        {"name": "Prompt Engineering", "description": "Mastering LLM interactions"}
    ]
    
    with patch("app.api.v1.personas.get_ai_draft") as mock_ai:
        mock_ai.return_value = mock_suggestions
        
        # Create a persona to draft for
        p_resp = client.post("/api/v1/personas/", json={"name": "Ethical Hacker", "description": "Security focus"})
        persona_id = p_resp.json()["id"]
        
        response = client.post(f"/api/v1/personas/{persona_id}/draft")
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 2
        assert data[0]["name"] == "AI Ethics"
