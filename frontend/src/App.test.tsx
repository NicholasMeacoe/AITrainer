import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('should render the AITrainer title', async () => {
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => [],
    });

    render(<App />);
    expect(screen.getByText(/AITrainer/i)).toBeInTheDocument();
  });

  it('should display the backend status after a successful fetch', async () => {
    // Mock fetch for both health check and personas
    (fetch as any).mockImplementation((url: string) => {
      if (url.includes('/health')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({ status: 'ok' }),
        });
      }
      if (url.includes('/api/v1/personas/')) {
        return Promise.resolve({
          ok: true,
          json: async () => [],
        });
      }
      return Promise.reject(new Error('Unknown URL'));
    });

    render(<App />);
    
    // Wait for the status to be updated in the UI
    await waitFor(() => {
        const statusElement = screen.getByText(/Backend Status:/i);
        expect(statusElement).toHaveTextContent(/OK/i);
    });
  });
});
