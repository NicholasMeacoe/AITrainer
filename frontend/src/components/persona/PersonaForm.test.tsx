import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PersonaForm from './PersonaForm';

describe('PersonaForm', () => {
  it('should render the form fields', () => {
    render(<PersonaForm onSubmit={vi.fn()} />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Template/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Competencies/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Difficulty/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Duration/i)).toBeInTheDocument();
  });

  it('should call onSubmit with form data including metadata', async () => {
    const handleSubmit = vi.fn();
    render(<PersonaForm onSubmit={handleSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'New Persona' } });
    fireEvent.change(screen.getByLabelText(/Competencies/i), { target: { value: 'AI, ML' } });
    fireEvent.change(screen.getByLabelText(/Difficulty/i), { target: { value: 'Advanced' } });
    fireEvent.change(screen.getByLabelText(/Duration/i), { target: { value: '20h' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Save/i }));
    
    expect(handleSubmit).toHaveBeenCalledWith({
      name: 'New Persona',
      description: '',
      is_template: false,
      target_competencies: 'AI, ML',
      difficulty: 'Advanced',
      estimated_duration: '20h',
    });
  });
});
