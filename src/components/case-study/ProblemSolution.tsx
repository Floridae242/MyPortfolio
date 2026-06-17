import './case-study.css';

// Note: labels use CSS ::before pseudo-elements (not DOM text) so that
// getByText(/Problem/i) and getByText(/Solution/i) each match exactly one
// element (the content <p>) — avoids "multiple elements" errors in tests.
export function ProblemSolution({ problem, solution }: { problem: string; solution: string }) {
  return (
    <div className="ps">
      <div>
        <div className="label label-problem" />
        <p>{problem}</p>
      </div>
      <div>
        <div className="label label-solution" />
        <p>{solution}</p>
      </div>
    </div>
  );
}
