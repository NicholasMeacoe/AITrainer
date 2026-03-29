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
  });

  it('should call onSubmit with form data', async () => {
    const handleSubmit = vi.fn();
    render(<PersonaForm onSubmit={handleSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'New Persona' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'New Desc' } });
    fireEvent.click(screen.getByLabelText(/Template/i));
    
    fireEvent.click(screen.getByRole('button', { name: /Save/i }));
    
    expect(handleSubmit).toHaveBeenCalledWith({
      name: 'New Persona',
      description: 'New Desc',
      is_template: true,
    });
  });
});
