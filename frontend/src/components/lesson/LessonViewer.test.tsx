import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LessonViewer, { LessonType } from './LessonViewer';

describe('LessonViewer', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  const mockLessons = [
    {
      id: 1,
      module_id: 10,
      title: 'Lesson 1',
      content: '# Content 1',
      type: LessonType.MARKDOWN,
      order: 1
    },
    {
      id: 2,
      module_id: 10,
      title: 'Lesson 2',
      content: '{"question": "Q?", "options": ["A", "B"], "correctAnswer": 0}',
      type: LessonType.QUIZ,
      order: 2
    }
  ];

  it('should render loading state initially', () => {
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockLessons,
    });
    render(<LessonViewer moduleId={10} onClose={() => {}} />);
    expect(screen.getByText(/Loading lessons.../i)).toBeInTheDocument();
  });

  it('should render the first lesson after loading', async () => {
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockLessons,
    });
    render(<LessonViewer moduleId={10} onClose={() => {}} />);
    await waitFor(() => expect(screen.queryByText(/Loading lessons.../i)).not.toBeInTheDocument());
    expect(screen.getByText('Lesson 1')).toBeInTheDocument();
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('should navigate to the next lesson', async () => {
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockLessons,
    });
    render(<LessonViewer moduleId={10} onClose={() => {}} />);
    await waitFor(() => expect(screen.getByText('Lesson 1')).toBeInTheDocument());
    
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Lesson 2')).toBeInTheDocument();
    expect(screen.getByText('Q?')).toBeInTheDocument();
  });

  it('should disable Previous button on first lesson', async () => {
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockLessons,
    });
    render(<LessonViewer moduleId={10} onClose={() => {}} />);
    await waitFor(() => expect(screen.getByText('Lesson 1')).toBeInTheDocument());
    
    expect(screen.getByText('Previous')).toBeDisabled();
  });

  it('should call onClose when Close button is clicked', async () => {
    const handleClose = vi.fn();
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockLessons,
    });
    render(<LessonViewer moduleId={10} onClose={handleClose} />);
    await waitFor(() => expect(screen.getByText('Close Lesson')).toBeInTheDocument());
    
    fireEvent.click(screen.getByText('Close Lesson'));
    expect(handleClose).toHaveBeenCalled();
  });
});
