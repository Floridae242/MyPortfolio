import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BackendGraph } from './BackendGraph';

describe('BackendGraph', () => {
  it('renders an svg with the four backend nodes', () => {
    const { container } = render(<BackendGraph />);
    expect(container.querySelector('svg')).not.toBeNull();
    ['API', 'CMS', 'DB', 'WS'].forEach((label) => {
      expect(container.textContent).toContain(label);
    });
  });
});
