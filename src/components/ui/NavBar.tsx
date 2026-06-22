import { Link } from 'react-router-dom';
import './navbar.css';

const LINKS = [
  ['Projects', '#projects'], ['Awards', '#awards'], ['Activities', '#activities'],
  ['Growth', '#self-development'], ['Writing', '#journal'], ['About', '#about'], ['Contact', '#contact'],
] as const;

export function NavBar() {
  return (
    <header className="navbar">
      <Link to="/" className="brand">~/naruephon</Link>
      <nav aria-label="Main navigation">
        {LINKS.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        <Link to="/admin" aria-label="Admin">·</Link>
      </nav>
    </header>
  );
}
