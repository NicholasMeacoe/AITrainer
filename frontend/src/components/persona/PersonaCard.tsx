import React from 'react';

interface Persona {
  id: number;
  name: string;
  description?: string;
  is_template: boolean;
}

interface PersonaCardProps {
  persona: Persona;
  onClick?: () => void;
}

const PersonaCard: React.FC<PersonaCardProps> = ({ persona, onClick }) => {
  return (
    <div className="persona-card" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <h3>{persona.name}</h3>
      <p>{persona.description}</p>
      {persona.is_template && <span className="badge">Template</span>}
    </div>
  );
};

export default PersonaCard;
