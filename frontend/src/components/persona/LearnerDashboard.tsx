import React, { useState, useEffect } from 'react';

interface Module {
  id: number;
  name: string;
  description?: string;
}

interface Persona {
  id: number;
  name: string;
  modules: Module[];
}

interface LearnerDashboardProps {
  personaId: number;
}

const LearnerDashboard: React.FC<LearnerDashboardProps> = ({ personaId }) => {
  const [persona, setPersona] = useState<Persona | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/personas/${personaId}`)
      .then((res) => res.json())
      .then((data) => {
        setPersona(data);
        setLoading(false);
      });
  }, [personaId]);

  if (loading) return <div>Loading roadmap...</div>;
  if (!persona) return <div>Roadmap not found</div>;

  return (
    <div className="learner-dashboard">
      <h1>Your {persona.name} Roadmap</h1>
      <div className="roadmap-list">
        {persona.modules.map((module, index) => (
          <div key={module.id} className="roadmap-step">
            <div className="step-number">{index + 1}</div>
            <div className="step-content">
              <h3>{module.name}</h3>
              <p>{module.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearnerDashboard;
