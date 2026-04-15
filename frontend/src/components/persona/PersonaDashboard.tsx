import React, { useState, useEffect } from 'react';
import PersonaList from './PersonaList';
import type { Persona } from './PersonaList';
import Modal from '../layout/Modal';
import PersonaForm from './PersonaForm';
import PersonaDetail from './PersonaDetail';

const PersonaDashboard: React.FC = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPersonaId, setSelectedPersonaId] = useState<number | null>(null);

  const fetchPersonas = () => {
    setLoading(true);
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
  };

  useEffect(() => {
    fetchPersonas();
  }, []);

  const handleCreatePersona = (data: any) => {
    fetch('http://localhost:8000/api/v1/personas/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to create persona');
        return res.json();
      })
      .then(() => {
        setIsModalOpen(false);
        fetchPersonas();
      })
      .catch((err) => alert(err.message));
  };

  if (loading) return <div>Loading personas...</div>;
  if (error) return <div>Error: {error}</div>;

  if (selectedPersonaId) {
    return (
      <PersonaDetail
        personaId={selectedPersonaId}
        onBack={() => setSelectedPersonaId(null)}
      />
    );
  }

  return (
    <div className="persona-dashboard">
      <div className="header-actions">
        <h1>Persona Dashboard</h1>
        <button onClick={() => setIsModalOpen(true)}>Create Persona</button>
      </div>
      
      {personas.length === 0 ? (
        <p>No personas defined yet. Start by creating one!</p>
      ) : (
        <PersonaList personas={personas} onSelect={setSelectedPersonaId} />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Persona"
      >
        <PersonaForm onSubmit={handleCreatePersona} />
      </Modal>
    </div>
  );
};

export default PersonaDashboard;
