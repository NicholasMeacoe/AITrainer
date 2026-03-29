import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PersonaDashboard from './PersonaDashboard';

describe('PersonaDashboard', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('should render the loading state initially', () => {
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => [],
    });
    render(<PersonaDashboard />);
    expect(screen.getByText(/Loading personas.../i)).toBeInTheDocument();
  });

  it('should render the Persona Dashboard title after loading', async () => {
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => [],
    });
    render(<PersonaDashboard />);
    await waitFor(() => expect(screen.queryByText(/Loading personas.../i)).not.toBeInTheDocument());
    expect(screen.getByText(/Persona Dashboard/i)).toBeInTheDocument();
  });

  it('should display a message when no personas are found', async () => {
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => [],
    });
    render(<PersonaDashboard />);
    await waitFor(() => expect(screen.getByText(/No personas defined yet/i)).toBeInTheDocument());
  });

  it('should render a list of personas', async () => {
    const mockPersonas = [
      { id: 1, name: 'Junior Dev', description: 'Beginner', is_template: true },
      { id: 2, name: 'Senior Dev', description: 'Expert', is_template: false },
    ];
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockPersonas,
    });
    render(<PersonaDashboard />);
    await waitFor(() => expect(screen.getByText('Junior Dev')).toBeInTheDocument());
    expect(screen.getByText('Senior Dev')).toBeInTheDocument();
  });

  it('should render an error message when fetch fails', async () => {
    (fetch as any).mockResolvedValue({
      ok: false,
    });
    render(<PersonaDashboard />);
    await waitFor(() => expect(screen.getByText(/Error: Failed to fetch personas/i)).toBeInTheDocument());
  });

  it('should open the modal when Create Persona button is clicked', async () => {
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => [],
    });
    render(<PersonaDashboard />);
    await waitFor(() => expect(screen.queryByText(/Loading personas.../i)).not.toBeInTheDocument());
    
    fireEvent.click(screen.getByText(/Create Persona/i));
    expect(screen.getByText(/Create New Persona/i)).toBeInTheDocument();
  });
});
