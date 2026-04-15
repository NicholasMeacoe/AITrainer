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

  it('should render error message when persona is not found', async () => {
    (fetch as any).mockResolvedValue({
      ok: false,
      json: async () => ({}),
    });

    render(<PersonaDetail personaId={1} onBack={vi.fn()} />);
    
    await waitFor(() => expect(screen.getByText(/Persona not found/i)).toBeInTheDocument());
  });

  it('should render LessonViewer when a module is started', async () => {
    const mockPersona = {
      id: 1,
      name: 'Test Persona',
      description: 'Test Desc',
      modules: [
        { id: 101, name: 'Module A', description: 'Desc A' },
      ],
    };
    
    (fetch as any).mockImplementation((url: string) => {
      if (url.includes('/api/v1/personas/1')) {
        return Promise.resolve({
          ok: true,
          json: async () => mockPersona,
        });
      }
      if (url.includes('/api/v1/modules/101/lessons/')) {
        return Promise.resolve({
          ok: true,
          json: async () => [],
        });
      }
      return Promise.reject(new Error('Unknown URL'));
    });

    const { fireEvent } = await import('@testing-library/react');
    render(<PersonaDetail personaId={1} onBack={vi.fn()} />);
    
    await waitFor(() => expect(screen.getByText('Module A')).toBeInTheDocument());
    
    fireEvent.click(screen.getByText('Start Lesson'));
    
    await waitFor(() => expect(screen.getByText(/No lessons found for this module/i)).toBeInTheDocument());
  });
});
