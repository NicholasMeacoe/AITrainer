import React, { useState, useEffect } from 'react';
import PlanBuilder from './PlanBuilder';
import LessonViewer from '../lesson/LessonViewer';

interface Module {
  id: number;
  name: string;
  description?: string;
}

interface Persona {
  id: number;
  name: string;
  description?: string;
  modules: Module[];
}

interface PersonaDetailProps {
  personaId: number;
  onBack: () => void;
}

const PersonaDetail: React.FC<PersonaDetailProps> = ({ personaId, onBack }) => {
  const [persona, setPersona] = useState<Persona | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeModuleId, setActiveModuleId] = useState<number | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/personas/${personaId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Persona not found');
        return res.json();
      })
      .then((data) => {
        setPersona(data);
        setLoading(false);
      })
      .catch(() => {
        setPersona(null);
        setLoading(false);
      });
  }, [personaId]);

  const handleReorder = (newModules: Module[]) => {
    // For now, just update local state. 
    // In a real app, we'd send the new order to the API.
    setPersona((prev) => prev ? { ...prev, modules: newModules } : null);
  };

  if (loading) return <div>Loading details...</div>;
  if (!persona) return <div>Persona not found</div>;

  if (activeModuleId !== null) {
    return (
      <LessonViewer 
        moduleId={activeModuleId} 
        onClose={() => setActiveModuleId(null)} 
      />
    );
  }

  return (
    <div className="persona-detail">
      <button onClick={onBack}>Back to Dashboard</button>
      <h1>{persona.name} Plan</h1>
      <p>{persona.description}</p>
      
      <h3>Learning Modules</h3>
      <PlanBuilder 
        initialModules={persona.modules} 
        onReorder={handleReorder} 
        onStartModule={(id) => setActiveModuleId(id)}
      />
    </div>
  );
};

export default PersonaDetail;
