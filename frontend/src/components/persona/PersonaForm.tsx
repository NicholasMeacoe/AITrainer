import React, { useState } from 'react';

interface PersonaFormData {
  name: string;
  description?: string;
  is_template: boolean;
  target_competencies?: string;
  difficulty?: string;
  estimated_duration?: string;
}

interface PersonaFormProps {
  initialData?: PersonaFormData;
  onSubmit: (data: PersonaFormData) => void;
}

const PersonaForm: React.FC<PersonaFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState<PersonaFormData>(
    initialData || { 
      name: '', 
      description: '', 
      is_template: false,
      target_competencies: '',
      difficulty: '',
      estimated_duration: ''
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="persona-form">
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="target_competencies">Competencies</label>
        <input
          type="text"
          id="target_competencies"
          name="target_competencies"
          value={formData.target_competencies}
          onChange={handleChange}
          placeholder="e.g. React, Python, AI Ethics"
        />
      </div>
      <div>
        <label htmlFor="difficulty">Difficulty</label>
        <select
          id="difficulty"
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
        >
          <option value="">Select difficulty</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>
      <div>
        <label htmlFor="estimated_duration">Duration</label>
        <input
          type="text"
          id="estimated_duration"
          name="estimated_duration"
          value={formData.estimated_duration}
          onChange={handleChange}
          placeholder="e.g. 10 hours"
        />
      </div>
      <div>
        <label htmlFor="is_template">
          <input
            type="checkbox"
            id="is_template"
            name="is_template"
            checked={formData.is_template}
            onChange={handleChange}
          />
          Template
        </label>
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default PersonaForm;
