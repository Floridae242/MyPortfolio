import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AdminGateway } from './AdminGateway';

describe('AdminGateway', () => {
  it('renders a themed gateway that links to the existing admin.html CMS', () => {
    render(<MemoryRouter><AdminGateway /></MemoryRouter>);
    const link = screen.getByRole('link', { name: /enter cms/i });
    expect(link).toHaveAttribute('href', '/admin.html');
  });
});
