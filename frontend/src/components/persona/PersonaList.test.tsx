import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PersonaList from './PersonaList';

describe('PersonaList', () => {
  const mockPersonas = [
    { id: 1, name: 'Persona 1', description: 'Desc 1', is_template: true },
    { id: 2, name: 'Persona 2', description: 'Desc 2', is_template: false },
  ];

  it('should render a list of personas', () => {
    render(<PersonaList personas={mockPersonas} />);
    expect(screen.getByText('Persona 1')).toBeInTheDocument();
    expect(screen.getByText('Persona 2')).toBeInTheDocument();
  });

  it('should call onSelect when a persona card is clicked', () => {
    const handleSelect = vi.fn();
    render(<PersonaList personas={mockPersonas} onSelect={handleSelect} />);
    
    fireEvent.click(screen.getByText('Persona 1'));
    expect(handleSelect).toHaveBeenCalledWith(1);
  });
});
