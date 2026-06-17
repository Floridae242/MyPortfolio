import { Link } from 'react-router-dom';
import './admin-gateway.css';

export function AdminGateway() {
  return (
    <div className="admin-gate">
      <div className="panel">
        <div className="lock">◈ secure gateway</div>
        <div className="row">$ auth --realm cms</div>
        <div className="row">// credentials handled by the CMS</div>
        <a className="enter" href="/admin.html" aria-label="Enter CMS">Enter CMS →</a>
        <div style={{ marginTop: '1rem' }}><Link to="/" className="row">← back to site</Link></div>
      </div>
    </div>
  );
}
