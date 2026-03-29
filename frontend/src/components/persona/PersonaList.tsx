import React from 'react';
import PersonaCard from './PersonaCard';

interface Persona {
  id: number;
  name: string;
  description?: string;
  is_template: boolean;
}

interface PersonaListProps {
  personas: Persona[];
}

const PersonaList: React.FC<PersonaListProps> = ({ personas }) => {
  return (
    <div className="persona-list">
      {personas.map((persona) => (
        <PersonaCard key={persona.id} persona={persona} />
      ))}
    </div>
  );
};

export default PersonaList;
export type { Persona };
