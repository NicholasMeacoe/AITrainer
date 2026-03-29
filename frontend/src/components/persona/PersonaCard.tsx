import React from 'react';

interface Persona {
  id: number;
  name: string;
  description?: string;
  is_template: boolean;
}

interface PersonaCardProps {
  persona: Persona;
}

const PersonaCard: React.FC<PersonaCardProps> = ({ persona }) => {
  return (
    <div className="persona-card">
      <h3>{persona.name}</h3>
      <p>{persona.description}</p>
      {persona.is_template && <span className="badge">Template</span>}
    </div>
  );
};

export default PersonaCard;
