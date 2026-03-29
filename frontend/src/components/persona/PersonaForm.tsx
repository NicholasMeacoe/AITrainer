import React, { useState } from 'react';

interface PersonaFormData {
  name: string;
  description?: string;
  is_template: boolean;
}

interface PersonaFormProps {
  initialData?: PersonaFormData;
  onSubmit: (data: PersonaFormData) => void;
}

const PersonaForm: React.FC<PersonaFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState<PersonaFormData>(
    initialData || { name: '', description: '', is_template: false }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
