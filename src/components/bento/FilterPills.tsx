import './filter-pills.css';

export function FilterPills({ categories, active, onChange }: { categories: string[]; active: string; onChange: (c: string) => void }) {
  return (
    <div className="filter-pills" role="tablist" aria-label="Project categories">
      {categories.map((c) => (
        <button key={c} role="tab" aria-selected={c === active} className={`pill ${c === active ? 'active' : ''}`} onClick={() => onChange(c)}>{c}</button>
      ))}
    </div>
  );
}
