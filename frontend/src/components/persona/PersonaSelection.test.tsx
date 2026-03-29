import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PersonaSelection from './PersonaSelection';

describe('PersonaSelection', () => {
  const mockPersonas = [
    { id: 1, name: 'Persona 1', description: 'Desc 1' },
    { id: 2, name: 'Persona 2', description: 'Desc 2' },
  ];

  it('should render the list of available personas', () => {
    render(<PersonaSelection personas={mockPersonas} onSelect={vi.fn()} />);
    expect(screen.getByText('Persona 1')).toBeInTheDocument();
    expect(screen.getByText('Persona 2')).toBeInTheDocument();
  });

  it('should call onSelect when a persona is clicked', () => {
    const handleSelect = vi.fn();
    render(<PersonaSelection personas={mockPersonas} onSelect={handleSelect} />);
    
    fireEvent.click(screen.getByText('Persona 1'));
    expect(handleSelect).toHaveBeenCalledWith(1);
  });
});
