import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PersonaDetail from './PersonaDetail';

describe('PersonaDetail', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('should render the persona details', async () => {
    const mockPersona = {
      id: 1,
      name: 'Test Persona',
      description: 'Test Desc',
      modules: [
        { id: 101, name: 'Module A', description: 'Desc A' },
      ],
    };
    
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockPersona,
    });

    render(<PersonaDetail personaId={1} onBack={vi.fn()} />);
    
    expect(screen.getByText(/Loading details.../i)).toBeInTheDocument();
    
    await waitFor(() => expect(screen.getByText('Test Persona Plan')).toBeInTheDocument());
    expect(screen.getByText('Test Desc')).toBeInTheDocument();
    expect(screen.getByText('Module A')).toBeInTheDocument();
  });
});
