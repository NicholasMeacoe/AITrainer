import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App', () => {
  it('should render the AITrainer title', () => {
    render(<App />);
    // This is expected to fail because the default Vite app doesn't have this title yet.
    expect(screen.getByText(/AITrainer/i)).toBeInTheDocument();
  });

  it('should increment the counter when clicked', async () => {
    const { userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<App />);
    const button = screen.getByRole('button', { name: /Count is 0/i });
    await user.click(button);
    expect(screen.getByRole('button', { name: /Count is 1/i })).toBeInTheDocument();
  });

  it('should display the backend status after a successful fetch', async () => {
    // Mock fetch for the backend health check
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ status: 'ok' }),
    });

    render(<App />);
    
    // Wait for the status to be updated in the UI
    const statusElement = await screen.findByText(/Backend Status: OK/i);
    expect(statusElement).toBeInTheDocument();
  });
});
