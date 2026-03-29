import React, { useState, useEffect } from 'react';
import PersonaList, { Persona } from './PersonaList';

const PersonaDashboard: React.FC = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/v1/personas/')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch personas');
        return res.json();
      })
      .then((data) => {
        setPersonas(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading personas...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="persona-dashboard">
      <h1>Persona Dashboard</h1>
      {personas.length === 0 ? (
        <p>No personas defined yet. Start by creating one!</p>
      ) : (
        <PersonaList personas={personas} />
      )}
    </div>
  );
};

export default PersonaDashboard;
