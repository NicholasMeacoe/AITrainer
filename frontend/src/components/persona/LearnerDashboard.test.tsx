import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LearnerDashboard from './LearnerDashboard';

describe('LearnerDashboard', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('should render the roadmap for the selected persona', async () => {
    const mockPersona = {
      id: 1,
      name: 'Junior Dev',
      modules: [
        { id: 101, name: 'Intro to AI', description: 'Basics' },
      ],
    };
    
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockPersona,
    });

    render(<LearnerDashboard personaId={1} />);
    
    await waitFor(() => expect(screen.getByText('Your Junior Dev Roadmap')).toBeInTheDocument());
    expect(screen.getByText('Intro to AI')).toBeInTheDocument();
  });
});
