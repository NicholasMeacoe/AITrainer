import React from 'react';

interface Persona {
  id: number;
  name: string;
  description?: string;
}

interface PersonaSelectionProps {
  personas: Persona[];
  onSelect: (id: number) => void;
}

const PersonaSelection: React.FC<PersonaSelectionProps> = ({ personas, onSelect }) => {
  return (
    <div className="persona-selection">
      <h2>Choose your professional path</h2>
      <p>Select the persona that best matches your role or goals.</p>
      <div className="persona-selection-grid">
        {personas.map((persona) => (
          <div
            key={persona.id}
            className="persona-selection-card"
            onClick={() => onSelect(persona.id)}
          >
            <h3>{persona.name}</h3>
            <p>{persona.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonaSelection;
