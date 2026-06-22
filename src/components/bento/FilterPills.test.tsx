import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterPills } from './FilterPills';

describe('FilterPills', () => {
  it('renders categories and calls onChange when clicked', () => {
    const onChange = vi.fn();
    render(<FilterPills categories={['All', 'Production']} active="All" onChange={onChange} />);
    fireEvent.click(screen.getByText('Production'));
    expect(onChange).toHaveBeenCalledWith('Production');
  });
});
