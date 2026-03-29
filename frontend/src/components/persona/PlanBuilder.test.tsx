import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PlanBuilder from './PlanBuilder';

describe('PlanBuilder', () => {
  const mockModules = [
    { id: 1, name: 'Module 1', description: 'Desc 1' },
    { id: 2, name: 'Module 2', description: 'Desc 2' },
  ];

  it('should render the list of modules', () => {
    render(<PlanBuilder initialModules={mockModules} onReorder={vi.fn()} />);
    expect(screen.getByText('Module 1')).toBeInTheDocument();
    expect(screen.getByText('Module 2')).toBeInTheDocument();
  });
});
