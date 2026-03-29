from typing import List, Dict

def get_ai_draft(persona_name: str, persona_description: str) -> List[Dict[str, str]]:
    """
    Simulates a call to an AI service to generate a draft learning plan.
    In a real implementation, this would call an LLM API (OpenAI, Anthropic, etc.).
    """
    # Placeholder implementation
    return [
        {"name": f"Foundations of {persona_name}", "description": f"Core concepts for {persona_description}"},
        {"name": "Advanced Techniques", "description": "Taking your skills to the next level"},
    ]
