import './case-study.css';
export function TechTags({ tags }: { tags: string[] }) {
  return <div className="tech-tags">{tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>;
}
