import { describe, it, expect } from 'vitest';
import { filterByCategory, deriveCategories } from './filter';

const items = [
  { categories: ['Production', 'Academic'] },
  { categories: ['Competition'] },
  { categories: ['Production'] },
];

describe('filterByCategory', () => {
  it('returns all when category is "All"', () => {
    expect(filterByCategory(items, 'All')).toHaveLength(3);
  });
  it('returns only matching items', () => {
    expect(filterByCategory(items, 'Production')).toHaveLength(2);
  });
  it('derives unique sorted categories with All first', () => {
    expect(deriveCategories(items)).toEqual(['All', 'Academic', 'Competition', 'Production']);
  });
});
