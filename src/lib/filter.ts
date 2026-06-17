export function filterByCategory<T extends { categories: string[] }>(items: T[], category: string): T[] {
  if (category === 'All') return items;
  return items.filter((i) => i.categories.includes(category));
}

export function deriveCategories<T extends { categories: string[] }>(items: T[]): string[] {
  const set = new Set<string>();
  items.forEach((i) => i.categories.forEach((c) => set.add(c)));
  return ['All', ...Array.from(set).sort()];
}
