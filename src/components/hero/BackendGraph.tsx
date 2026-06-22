import './backend-graph.css';

export function BackendGraph() {
  return (
    <svg className="backend-graph" viewBox="0 0 200 200" role="img" aria-label="Backend architecture: API connected to CMS, database, and WebSocket">
      <g>
        <line className="edge pulse" x1="100" y1="40" x2="50" y2="110" />
        <line className="edge pulse" x1="100" y1="40" x2="150" y2="110" />
        <line className="edge pulse" x1="50" y1="110" x2="100" y2="170" />
        <line className="edge pulse" x1="150" y1="110" x2="100" y2="170" />
        <line className="edge" x1="50" y1="110" x2="150" y2="110" />
      </g>
      <g>
        <circle className="node" cx="100" cy="40" r="16" />
        <circle className="node" cx="50" cy="110" r="13" />
        <circle className="node" cx="150" cy="110" r="13" />
        <circle className="node" cx="100" cy="170" r="13" />
      </g>
      <g>
        <text x="100" y="43">API</text>
        <text x="50" y="113">CMS</text>
        <text x="150" y="113">DB</text>
        <text x="100" y="173">WS</text>
      </g>
    </svg>
  );
}
