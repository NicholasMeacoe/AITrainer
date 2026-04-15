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

  it('should call fetch to create a persona when form is submitted', async () => {
    (fetch as any).mockImplementation((url: string) => {
      if (url.endsWith('/api/v1/personas/')) {
        return Promise.resolve({
          ok: true,
          json: async () => [],
        });
      }
      return Promise.reject(new Error('Unknown URL'));
    });

    render(<PersonaDashboard />);
    await waitFor(() => expect(screen.queryByText(/Loading personas.../i)).not.toBeInTheDocument());
    
    fireEvent.click(screen.getByText(/Create Persona/i));
    
    // Simulate form submission
    const nameInput = screen.getByLabelText(/Name/i);
    fireEvent.change(nameInput, { target: { value: 'New Persona' } });
    
    // We need to find the submit button in the modal
    // In PersonaForm.tsx, the button text is "Save"
    const submitButton = screen.getByRole('button', { name: /Save/i });
    
    // Mock the POST response
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 3, name: 'New Persona' }),
    });

    fireEvent.click(submitButton);

    await waitFor(() => expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/v1/personas/'),
      expect.objectContaining({ 
        method: 'POST',
        body: expect.stringContaining('New Persona')
      })
    ));
  });

  it('should display error when fetch fails', async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: false,
    });
    render(<PersonaDashboard />);
    await waitFor(() => expect(screen.getByText(/Error: Failed to fetch personas/i)).toBeInTheDocument());
  });
});
