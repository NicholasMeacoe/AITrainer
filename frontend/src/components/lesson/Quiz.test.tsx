import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Quiz from './Quiz';

describe('Quiz', () => {
  const quizContent = JSON.stringify({
    question: 'What is AI?',
    options: ['Artificial Intel', 'Artificially Intelligent', 'Artificial Intelligence'],
    correctAnswer: 2,
    explanation: 'AI stands for Artificial Intelligence.'
  });

  it('should render the quiz question and options', () => {
    render(<Quiz content={quizContent} onComplete={() => {}} />);
    expect(screen.getByText('What is AI?')).toBeInTheDocument();
    expect(screen.getByText('Artificial Intelligence')).toBeInTheDocument();
  });

  it('should show feedback and explanation on correct answer', () => {
    render(<Quiz content={quizContent} onComplete={() => {}} />);
    fireEvent.click(screen.getByText('Artificial Intelligence'));
    fireEvent.click(screen.getByText('Check Answer'));
    
    expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
    expect(screen.getByText('AI stands for Artificial Intelligence.')).toBeInTheDocument();
  });

  it('should show error on incorrect answer', () => {
    render(<Quiz content={quizContent} onComplete={() => {}} />);
    fireEvent.click(screen.getByText('Artificial Intel'));
    fireEvent.click(screen.getByText('Check Answer'));
    
    expect(screen.getByText(/Incorrect./i)).toBeInTheDocument();
  });

  it('should call onComplete when Continue button is clicked', () => {
    const handleComplete = vi.fn();
    render(<Quiz content={quizContent} onComplete={handleComplete} />);
    fireEvent.click(screen.getByText('Artificial Intelligence'));
    fireEvent.click(screen.getByText('Check Answer'));
    
    fireEvent.click(screen.getByText('Continue to Next Lesson'));
    expect(handleComplete).toHaveBeenCalled();
  });

  it('should render error message for invalid quiz content', () => {
    render(<Quiz content="invalid-json" onComplete={() => {}} />);
    expect(screen.getByText(/Error: Invalid quiz content/i)).toBeInTheDocument();
  });
});
